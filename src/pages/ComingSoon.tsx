import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Calendar, Mail, ChevronRight, Clock, Github, Twitter, Facebook, Instagram } from "lucide-react";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [countDown, setCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set launch date - 19 May 2025
  const launchDate = new Date("2025-05-19T00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountDown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Veuillez entrer votre email");
      return;
    }

    // Simulate API call
    toast.success("Merci! Nous vous tiendrons informé!");
    setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-burgundy-950 to-burgundy-900 relative overflow-hidden px-4 ">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pt-24 mt-16">
        <div className="absolute h-full w-full bg-[radial-gradient(circle_at_center,_rgba(128,0,32,0.3)_0,_rgba(0,0,0,0)_70%)] "></div>
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNnptMCAwYzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02Yy0zLjMxNCAwLTYgMi42ODYtNiA2czIuNjg2IDYgNiA2em0yNCAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNnptMCAwYzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02Yy0zLjMxNCAwLTYgMi42ODYtNiA2czIuNjg2IDYgNiA2em0wIDI0YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02Yy0zLjMxNCAwLTYgMi42ODYtNiA2czIuNjg2IDYgNiA2em0wIDBjMy4zMTQgMCA2LTIuNjg2IDYtNnMtMi42ODYtNi02LTZjLTMuMzE0IDAgLTYgMi42ODYtNiA2czIuNjg2IDYgNiA2eiIgc3Ryb2tlPSIjODAwMDIwIiBvcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik0xMiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAwYzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2em0wIDE4YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2em0wIDBjMy4zMTQgMCA2LTIuNjg2IDYtNnMtMi42ODYtNi02LTYtNiAyLjY4Ni02IDYgMi42ODYgNiA2IDZ6bTAgMjRjMy4zMTQgMCA2LTIuNjg2IDYtNnMtMi42ODYtNi02LTYtNiAyLjY4Ni02IDYgMi42ODYgNiA2IDZ6bTAgMGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnoiIHN0cm9rZT0iIzgwMDAyMCIgb3BhY2l0eT0iLjMiLz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-burgundy/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-burgundy/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-burgundy/10 blur-3xl"></div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto text-center z-10 px-4 pt-15 mt-12">
        {/* Logo */}
        <div className="mb-8 relative animate-fade-in">
          <div className="absolute -inset-1 bg-gradient-to-r from-burgundy-800 to-burgundy-600 rounded-lg blur opacity-25"></div>
          <div className="relative backdrop-blur-sm bg-black/30 rounded-lg p-6 border border-burgundy-800/30">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-burgundy-200 via-burgundy-100 to-burgundy-300">
              Résidence Madison
            </h1>
            <p className="text-gray-300 mt-2">Kribi, Cameroun</p>
          </div>
        </div>
        
        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          Notre site est en{" "}
          <span className="text-burgundy-300">cours de construction</span>
        </h2>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
          Nous travaillons dur pour vous offrir une expérience unique. Notre nouvelle plateforme sera bientôt disponible avec toutes nos offres et services.
        </p>
        
        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: countDown.days, label: "Jours" },
            { value: countDown.hours, label: "Heures" },
            { value: countDown.minutes, label: "Minutes" },
            { value: countDown.seconds, label: "Secondes" },
          ].map((item, i) => (
            <div key={i} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-burgundy-800 to-burgundy-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-black/80 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center border border-burgundy/20 group-hover:border-burgundy/40 transition duration-300">
                <span className="text-3xl md:text-4xl font-bold text-burgundy-300">
                  {item.value < 10 ? `0${item.value}` : item.value}
                </span>
                <span className="text-sm text-gray-400">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-burgundy-300" />
            <span>Ouverture prévue: Très bientôt</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-burgundy-300" />
            <span>Réservations bientôt disponibles</span>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mb-8">
          {[
            { icon: Facebook, label: "Facebook" },
            { icon: Twitter, label: "Twitter" },
            { icon: Instagram, label: "Instagram" },
          ].map((social, i) => (
            <a
              key={i}
              href="#"
              className="h-10 w-10 rounded-full bg-black/50 border border-burgundy/20 flex items-center justify-center hover:bg-burgundy hover:border-transparent hover:text-white transition-colors duration-300 text-burgundy-300"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
        
        {/* Copyright */}
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Résidence Madison. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;