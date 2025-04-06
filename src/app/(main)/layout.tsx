"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RegisterPage from "@/components/RegisterPage";
import { useAppContext } from "@/Context/context";
import axios from "axios"; 

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showRegister, setShowRegister, setUserInfo } = useAppContext(); // Destructure setShowRegister from context
  const [user, setUser] = useState<{
    emailAddresses: { emailAddress: string }[];
    id?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/getCurrentUser");
        setUser(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching user
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const checkUserData = async () => {
      setLoading(true); // Set loading to true before checking user data
      try {
        const {
          data: { token },
        } = await axios.get("/api/getToken"); // Get Clerk JWT Token

        let response = await axios.get(
          `http://localhost:5000/api/users/${user?.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200 && response.data) {
          setShowRegister(false); // User data exists, hide register page
          // console.log(response.data);
          setUserInfo((prev) => ({ ...prev, ...response.data }));
        }
        // API call to get user data
        else {
          setShowRegister(true); // User data does not exist, show register page
        }
      } catch (error) {
        setShowRegister(true); // On error, show register page
      } finally {
        setLoading(false); // Set loading to false after checking user data
      }
    };

    checkUserData();
  }, [showRegister, setShowRegister, user]);

  return (
    <div className="min-h-screen layout-container text-foreground antialiased bg-gradient-to-b from-background via-background/90 to-background">
      <Navbar />
      <div className="flex flex-col lg:flex-row relative z-10 max-w-full">
        <Sidebar className="w-full lg:w-64 lg:min-h-[calc(100vh-4rem)] lg:sticky lg:top-16" />
        <div className="flex w-full max-w-full min-h-full overflow-x-hidden element">
          {loading ? (
            <div className="flex h-full w-full items-center justify-center scale-75">
              <svg
                className="ip"
                viewBox="0 0 256 128"
                width="256px"
                height="128px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5ebd3e" />
                    <stop offset="33%" stopColor="#ffb900" />
                    <stop offset="67%" stopColor="#f78200" />
                    <stop offset="100%" stopColor="#e23838" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stopColor="#e23838" />
                    <stop offset="33%" stopColor="#973999" />
                    <stop offset="67%" stopColor="#009cdf" />
                    <stop offset="100%" stopColor="#5ebd3e" />
                  </linearGradient>
                </defs>
                <g fill="none" strokeLinecap="round" strokeWidth="16">
                  <g className="ip__track" stroke="#ddd">
                    <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                    <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                  </g>
                  <g strokeDasharray="180 656">
                    <path
                      className="ip__worm1"
                      stroke="url(#grad1)"
                      strokeDashoffset="0"
                      d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
                    />
                    <path
                      className="ip__worm2"
                      stroke="url(#grad2)"
                      strokeDashoffset="358"
                      d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
                    />
                  </g>
                </g>
              </svg>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <RegisterPage />
        </div>
      )}
    </div>
  );
  
}
