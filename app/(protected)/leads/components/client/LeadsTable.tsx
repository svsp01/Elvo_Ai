"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Search,
  Phone,
  PhoneCall,
  Loader2,
  Building,
  User,
  Mail,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LeadsWithRelations } from "@/app/(protected)/clusters/types";
import { initiateBulkCalls, initiateCall } from "@/services/callServices";

interface LeadsTableProps {
  initialLeads: LeadsWithRelations[];
}

function getLeadDisplayName(lead: LeadsWithRelations): string {
  // Try to extract name from JSON data first
  if (lead.data && typeof lead.data === "object") {
    const data = lead.data as any;
    if (data.name) return data.name;
    if (data.firstName && data.lastName)
      return `${data.firstName} ${data.lastName}`;
    if (data.firstName) return data.firstName;
  }

  // Fallback to email or phone
  return lead.email || lead.phoneNumber;
}

export function LeadsTable({ initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState<LeadsWithRelations[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [callingLeads, setCallingLeads] = useState<Set<string>>(new Set());
  const [bulkCalling, setBulkCalling] = useState(false);

  // Optimized search with useMemo - searches across phone, email, and JSON data
  const filteredLeads = useMemo(() => {
    if (!searchTerm.trim()) return leads;

    const term = searchTerm.toLowerCase();
    return leads.filter((lead) => {
      const searchableText = [
        lead.phoneNumber,
        lead.email,
        // Search in JSON data if it contains name, company, etc.
        typeof lead.data === "object" && lead.data
          ? JSON.stringify(lead.data).toLowerCase()
          : "",
        lead.organization?.name || "",
        lead.summary || "",
        lead.cluster?.name || "",
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(term);
    });
  }, [leads, searchTerm]);

  // Handle individual lead selection
  const handleLeadSelection = useCallback(
    (leadId: string, checked: boolean) => {
      setSelectedLeads((prev) => {
        const newSet = new Set(prev);
        if (checked) {
          newSet.add(leadId);
        } else {
          newSet.delete(leadId);
        }
        return newSet;
      });
    },
    []
  );

  // Handle select all
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedLeads(new Set(filteredLeads.map((lead) => lead.id)));
      } else {
        setSelectedLeads(new Set());
      }
    },
    [filteredLeads]
  );

  // Handle individual call
  const handleCall = useCallback(
    async (lead: LeadsWithRelations) => {
      setCallingLeads((prev) => new Set(prev).add(lead.id));

      try {
        const result = await initiateCall(lead.id);

        if (result.success) {
          toast("Call Initiated");

          // Refresh leads data or update optimistically
          // You might want to revalidate or update the lead's call history
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        toast("Call Failed");
      } finally {
        setCallingLeads((prev) => {
          const newSet = new Set(prev);
          newSet.delete(lead.id);
          return newSet;
        });
      }
    },
    [toast]
  );

  // Handle bulk call
  const handleBulkCall = useCallback(async () => {
    if (selectedLeads.size === 0) {
      toast("No Leads Selected");
      return;
    }

    setBulkCalling(true);

    try {
      const selectedLeadIds = Array.from(selectedLeads);
      const result = await initiateBulkCalls(selectedLeadIds);

      if (result.success) {
        toast("Bulk Calls Initiated");

        if (result.failedCount > 0) {
          toast("Partial Success");
        }

        // Clear selection
        setSelectedLeads(new Set());
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast("Bulk Call Failed");
    } finally {
      setBulkCalling(false);
    }
  }, [selectedLeads, toast]);

  const isAllSelected =
    filteredLeads.length > 0 &&
    filteredLeads.every((lead) => selectedLeads.has(lead.id));
  const isIndeterminate = selectedLeads.size > 0 && !isAllSelected;

  return (
    <div className="space-y-4">
      {/* Search and Bulk Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {selectedLeads.size > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{selectedLeads.size} selected</Badge>
                <Button
                  onClick={handleBulkCall}
                  disabled={bulkCalling}
                  className="gap-2"
                >
                  {bulkCalling ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <PhoneCall className="h-4 w-4" />
                  )}
                  Call Selected
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all leads"
                    className={
                      isIndeterminate
                        ? "data-[state=indeterminate]:bg-primary"
                        : ""
                    }
                  />
                </TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Calls</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {searchTerm
                      ? "No leads found matching your search."
                      : "No leads available."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedLeads.has(lead.id)}
                        onCheckedChange={(checked: boolean) =>
                          handleLeadSelection(lead.id, checked as boolean)
                        }
                        aria-label={`Select ${getLeadDisplayName(lead)}`}
                      />
                    </TableCell>

                    {/* Contact Info */}
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {getLeadDisplayName(lead)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {lead.phoneNumber}
                          </span>
                        </div>
                        {lead.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {lead.email}
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>

                    {/* Organization */}
                    <TableCell>
                      {lead.organization ? (
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>{lead.organization.name}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant={lead.public ? "default" : "secondary"}>
                          {lead.public ? "Public" : "Private"}
                        </Badge>
                        {lead.cluster && (
                          <Badge variant="outline" className="text-xs">
                            {lead.cluster.name}
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    {/* Calls Count */}
                    <TableCell>
                      <Badge variant="outline">
                        {lead.calls?.length || 0} calls
                      </Badge>
                    </TableCell>

                    {/* Created Date */}
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {new Date(lead.createdAt).toISOString()}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleCall(lead)}
                        disabled={callingLeads.has(lead.id)}
                        className="gap-2 w-full"
                      >
                        {callingLeads.has(lead.id) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Phone className="h-4 w-4" />
                        )}
                        Call Now
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
        <span>
          Showing {filteredLeads.length} of {leads.length} leads
        </span>
        {selectedLeads.size > 0 && (
          <span className="font-medium">
            {selectedLeads.size} leads selected
          </span>
        )}
      </div>
    </div>
  );
}
