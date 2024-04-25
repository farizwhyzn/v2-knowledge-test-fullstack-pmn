'use client'

import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function ProductDetail({params}: {productId: string}) {
  const url = process.env.API_URL || "http://localhost:8000";
  const router = useRouter();
  const [product, setProduct] = useState([])

  useEffect(() => {
    const token = getCookie('accessToken');
    if (token) {
      axios.get(`${url}/products/${params.productId[0]}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch(() => toast.error("Unexpected error when fetching this product"))
    }
  }, [])

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Breadcrumb className="hidden md:flex">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href="/">Dashboard</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href="/products">Products</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{product.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="relative ml-auto flex-1 md:grow-0">

                </div>
                <UserNav />
              </header>
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                  <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="icon" className="h-7 w-7">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                      </Button>
                      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        {product.name}
                      </h1>
                      <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button variant="outline" size="sm" onClick={() => router.push('/products')}>
                          Discard
                        </Button>
                        <Button size="sm" onClick={() => router.push(`/products/${params.productId[0]}/edit`)}>Edit Product</Button>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                          <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-6">
                              <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <text>{product.name}</text>
                              </div>
                              <div className="grid gap-3">
                                <Label htmlFor="description">Description</Label>
                                <text>{product.description}</text>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-1">
                          <CardHeader>
                            <CardTitle>Product Stock</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-6">
                              <div className="grid gap-3">
                                <text>{product.stock}</text>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
              </main>
          </div>
        </div>
    )
}