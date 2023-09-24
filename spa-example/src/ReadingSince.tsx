import ReactTimeAgo from "react-time-ago";
import { useEffect, useState } from "react";

export default function ReadingSince() {
  const [runningSinceDate, setRunningSinceDate] = useState<Date | null>(null);

  useEffect(() => {
    setRunningSinceDate(new Date());
  }, []);

  if (!runningSinceDate) {
    return null;
  }
  return (
    <>
      Reading since: <ReactTimeAgo date={runningSinceDate} locale="en-US" timeStyle={"twitter"} />
    </>
  );
}
