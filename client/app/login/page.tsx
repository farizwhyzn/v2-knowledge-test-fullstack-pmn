'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { setCookie, getCookie } from 'cookies-next'
import { toast } from "sonner";


export default function Login() {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      router.push('/')
    }
  }, [])

  const url = process.env.API_URL || "http://localhost:8000";
  const login = async (e: any) => {
    e.preventDefault()
    axios.post(`${url}/auth/login`, data)
      .then((res) => {
        toast.success("Logged in successfully")
        console.log(res)
        console.log(res.data)
        console.log(res.data.backendTokens)
        const tokens = res.data.backendTokens;
        const { accessToken, refreshToken } = tokens;
        setCookie('accessToken', accessToken, { maxAge: 60 * 15 });
        setCookie('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 });
        setCookie('name', res.data.user.name);
        setCookie('email', res.data.user.email);
        setCookie('role', res.data.user.role);
        // setCookie('user', res.data.user.);
        router.push("/")
      })
      .catch(() => toast.error("An error occurred while logging in"))
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={login}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={data.username}
                  onChange={e => setData({...data, username: e.target.value})}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={e => setData({...data, password: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}