"use client";

import { useCallback, useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { LeadWithRelations } from "../../types";
import { useAppDispatch } from "@/store/hooks";
import { setLeads, setSearchActive } from "@/store/clusterSlice";

export function SearchBarWrapper() {
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearchResults = useCallback(
    (results: any[]) => {
      console.log("Search results:", results);
      dispatch(setSearchActive(true));
      dispatch(setLeads(results));
    },
    [dispatch]
  );

  if (!mounted) {
    return null;
  }

  return <SearchBar onSearchResults={handleSearchResults} />;
}
