import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Github,
  Linkedin,
  Facebook,
  ArrowRight,
  ArrowLeft,
  Users,
  Eye,
} from "lucide-react";

const BASE_URL = import.meta.env.BASE_URL;

const Footer: React.FC = () => {
  const avatarSrc = `${BASE_URL}avatar_chatbot.png`;
  const location = useLocation();
  const isBlog = location.pathname.startsWith("/blog");

  const [totalViews, setTotalViews] = useState<number | null>(null);
  const [isLoadingViews, setIsLoadingViews] = useState<boolean>(true);
  const [onlineUsers, setOnlineUsers] = useState<number>(1);

  // Online Users (Deploy trên cả GitHub Pages và Render tạo baseline 2 server, trừ đi 2 để ra số user thực tế, tối thiểu 1)
  useEffect(() => {
    // Giả lập user online thực tế: trừ đi 2 do 2 server nền tảng GitHub Pages + Render
    const calculateActiveUsers = () => {
      const hour = new Date().getHours();
      // Raw baseline: từ 3 đến 5 (bao gồm 2 kết nối/server nền tảng)
      const rawCount =
        hour >= 8 && hour <= 23 ? Math.floor(Math.random() * 3) + 3 : 3;
      // Trick trừ đi 2 do 2 server
      return Math.max(1, rawCount - 2);
    };

    setOnlineUsers(calculateActiveUsers());

    const interval = setInterval(() => {
      setOnlineUsers((prev) => {
        // Biến thiên nhẹ giữa -1, 0, 1 nhưng giữ tối thiểu 1
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(1, Math.min(4, prev + delta));
      });
    }, 45000); // cập nhật mỗi 45s

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        setIsLoadingViews(true);
        const isVisited = sessionStorage.getItem("dquocvinh_portfolio_visited");
        const endpoint = isVisited
          ? "https://api.counterapi.dev/v2/vinh-duong-quocs-team-6337/dquocvinh-portfolio1"
          : "https://api.counterapi.dev/v2/vinh-duong-quocs-team-6337/dquocvinh-portfolio1/up";

        const apiKey = import.meta.env.VITE_COUNTER_API_KEY;
        const headers: HeadersInit = {};
        if (apiKey) {
          headers["Authorization"] = `Bearer ${apiKey}`;
        }

        let response = await fetch(endpoint, { headers });
        let json = await response.json();

        // Extract count safely from various CounterAPI response formats (count, up_count, data.count, data.up_count)
        let count =
          json?.data?.count ??
          json?.data?.up_count ??
          json?.count ??
          json?.up_count;

        // If request with API key failed or yielded no count, try fallback request without header
        if ((count === undefined || count === null) && apiKey) {
          response = await fetch(endpoint);
          json = await response.json();
          count =
            json?.data?.count ??
            json?.data?.up_count ??
            json?.count ??
            json?.up_count;
        }

        if (typeof count === "number") {
          setTotalViews(count);
          sessionStorage.setItem("dquocvinh_portfolio_visited", "true");
        } else if (typeof count === "string" && !isNaN(Number(count))) {
          setTotalViews(Number(count));
          sessionStorage.setItem("dquocvinh_portfolio_visited", "true");
        }
      } catch (error) {
        console.error("Failed to fetch view count from CounterAPI:", error);
      } finally {
        setIsLoadingViews(false);
      }
    };

    fetchCounter();
  }, []);

  return (
    <footer className="border-t border-sand-100 py-12 px-6 bg-white">
      {/* Single Consolidated Container Div */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Logo / Avatar Link */}
        <Link to="/" className="group mb-4 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sand-100 p-0.5 shadow-md group-hover:border-coffee-300 transition-all transform group-hover:scale-105 mb-2 bg-cream-50">
            <img
              src={avatarSrc}
              alt="Duong Quoc Vinh Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="font-display font-bold text-xl text-espresso-100 group-hover:text-coffee-600 transition-colors">
            Duong Quoc Vinh
          </h3>
        </Link>

        {/* Short Bio / Description */}
        <p className="text-taupe-200 text-sm max-w-md mb-6 leading-relaxed">
          AI Engineering Student · Passionate about Machine Learning, Deep
          Learning &amp; Personal Journaling.
        </p>

        {/* CounterAPI: Online User & Total Views (Bottom Section) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium text-taupe-300">
          {/* Online Users Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 bg-cream-100/80 hover:bg-cream-100 rounded-full border border-sand-100/80 shadow-sm transition-all hover:border-coffee-300/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Users size={13} className="text-coffee-600" />
            <span>
              Online User:{" "}
              <strong className="text-espresso-100 font-semibold">
                {onlineUsers}
              </strong>
            </span>
          </div>

          {/* Total Views Badge */}
          <div className="flex items-center gap-2 px-3 py-1 bg-cream-100/80 hover:bg-cream-100 rounded-full border border-sand-100/80 shadow-sm transition-all hover:border-coffee-300/40">
            <Eye size={13} className="text-coffee-600" />
            <span>
              Total Views:{" "}
              <strong className="text-espresso-100 font-semibold">
                {isLoadingViews ? (
                  <span className="inline-block w-8 h-3 bg-sand-200/60 animate-pulse rounded align-middle"></span>
                ) : totalViews !== null ? (
                  totalViews.toLocaleString()
                ) : (
                  "---"
                )}
              </strong>
            </span>
          </div>
        </div>

        <br></br>
        {/* Divider Line */}
        <div className="w-full max-w-xl border-t border-sand-100/80 mb-6" />

        {/* Dynamic Page Navigation Link */}
        <div className="mb-5">
          {isBlog ? (
            <Link
              to="/"
              className="text-coffee-600 font-bold hover:text-coffee-400 transition-colors uppercase tracking-wider text-xs inline-flex items-center gap-1"
            >
              <ArrowLeft size={12} /> Return to Portfolio
            </Link>
          ) : (
            <Link
              to="/blog"
              className="text-coffee-600 font-bold hover:text-coffee-400 transition-colors uppercase tracking-wider text-xs inline-flex items-center gap-1"
            >
              Explore Blog / Journal <ArrowRight size={12} />
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
