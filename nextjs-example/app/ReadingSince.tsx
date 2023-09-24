"use client";

import ReactTimeAgo from "react-time-ago";
import { useEffect, useState } from "react";

import en from "javascript-time-ago/locale/en.json";
import TimeAgo from "javascript-time-ago";

TimeAgo.addDefaultLocale(en);

export default function ReadingSince({ label }: { label?: string }) {
  const [runningSinceDate, setRunningSinceDate] = useState<Date | null>(null);

  useEffect(() => {
    setRunningSinceDate(new Date());
  }, []);

  if (!runningSinceDate) {
    return null;
  }
  return (
    <div>
      Reading since:{" "}
      <ReactTimeAgo
        date={runningSinceDate}
        locale="en-US"
        timeStyle={"twitter"}
      />{" "}
    </div>
  );
}
