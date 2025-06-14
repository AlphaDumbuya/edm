'use client';

import React from "react";
import { isAdminServer } from "@/helpers/isAdminServer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const AdminNewsPage = async () => {
  const isAdmin = await isAdminServer();

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

  return <div>Admin News Page Placeholder</div>;
};
export default AdminNewsPage;