"use client"

import { useState, useEffect, useCallback } from "react"
import type { HistoryItem } from "@/lib/types"

const STORAGE_KEY = "anoteai-history"
const MAX_ITEMS = 5

function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useHistory() {
  const [items, setItems] = useState<HistoryItem[]>([])

  useEffect(() => {
    setItems(loadHistory())
  }, [])

  const addItem = useCallback((item: Omit<HistoryItem, "id" | "createdAt">) => {
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    }
    setItems((prev) => {
      const updated = [newItem, ...prev].slice(0, MAX_ITEMS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setItems([])
  }, [])

  return { items, addItem, clearHistory }
}
