"use client";

import React, { useState, useEffect } from "react";
import { isAdminServer } from "@/helpers/isAdminServer";
import { NewsTable } from "@/components/news/NewsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminNewsPage = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  if (!isAdmin) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-destructive">
              Access Denied
            </CardTitle>
            <CardContent>
              You do not have permission to view this page.
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    );
  }
  useEffect(() => {
    const checkAdminStatus = async () => {
      setLoading(true);
      const result = await isAdminServer();
      setIsAdmin(result);
      setLoading(false);
    };

    checkAdminStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  return (
    <div>
      <NewsTable />
    </div>
  );
};
export default AdminNewsPage;