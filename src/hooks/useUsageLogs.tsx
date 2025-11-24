import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface UsageLog {
  id: string;
  tool_id: string;
  tool_name: string;
  created_at: string;
  workspace_id: string | null;
}

export function useUsageLogs() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<UsageLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      if (!user) {
        setLogs([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("usage_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(100);

        if (error) throw error;
        setLogs(data || []);
      } catch (error) {
        console.error("Error fetching usage logs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, [user]);

  const logToolUsage = async (toolId: string, toolName: string, workspaceId?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("usage_logs").insert({
        user_id: user.id,
        tool_id: toolId,
        tool_name: toolName,
        workspace_id: workspaceId || null,
      });

      if (error) throw error;

      // Refresh logs
      const { data } = await supabase
        .from("usage_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(100);

      if (data) setLogs(data);
    } catch (error) {
      console.error("Error logging tool usage:", error);
    }
  };

  return { logs, loading, logToolUsage };
}
