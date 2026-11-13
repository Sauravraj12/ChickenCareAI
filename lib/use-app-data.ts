"use client";

import { useEffect, useState } from "react";
import { AppData, initialData, storageKey } from "@/lib/demo-data";

export function useAppData() {
  const [data, setData] = useState<AppData>(initialData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setData({ ...initialData, ...JSON.parse(saved) as Partial<AppData> });
    } catch (error) {
      console.error("Could not load ChickenCare demo data from local storage.", error);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error("Could not save ChickenCare demo data to local storage.", error);
    }
  }, [data, ready]);

  return { data, setData, ready };
}
