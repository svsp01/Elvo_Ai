"use client";
import React, { useState ,type FormEvent  } from "react";
import ImportDialog from "./ImportDialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, RefreshCw, ChevronDown, Hash, Phone, Mail,Trash2,PencilIcon } from "lucide-react";
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface Lead {
  id: string
  phone: string
  email: string
  organization: string
  keywords: string
  isPublic: boolean
  additionalFields: { id: string; name: string; value: string }[]
  status: string
  created: string
}
 
const LeadsCreationPage = () => {
  const [open, setOpen] = useState(false); // set to false initially
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [organization, setOrganization] = useState("")
  const [keywords, setKeywords] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [additionalFields, setAdditionalFields] = useState<{ id: string; name: string; value: string }[]>([])



// Edit 
 const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [editPhone, setEditPhone] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editOrganization, setEditOrganization] = useState("")
  const [editKeywords, setEditKeywords] = useState("")
  const [editIsPublic, setEditIsPublic] = useState(false)
  const [editAdditionalFields, setEditAdditionalFields] = useState<{ id: string; name: string; value: string }[]>([])


  // Leads collection
  const [leads, setLeads] = useState<Lead[]>([])

  const addField = () => {
    const newId = `field-${additionalFields.length + 1}`
    setAdditionalFields([...additionalFields, { id: newId, name: "", value: "" }])
  }

  const updateFieldName = (id: string, name: string) => {
    setAdditionalFields(additionalFields.map((field) => (field.id === id ? { ...field, name } : field)))
  }

  const updateFieldValue = (id: string, value: string) => {
    setAdditionalFields(additionalFields.map((field) => (field.id === id ? { ...field, value } : field)))
  }

 const updateEditFieldName = (id: string, name: string) => {
    setEditAdditionalFields(editAdditionalFields.map((field) => (field.id === id ? { ...field, name } : field)))
  }

  const updateEditFieldValue = (id: string, value: string) => {
    setEditAdditionalFields(editAdditionalFields.map((field) => (field.id === id ? { ...field, value } : field)))
  }

  const resetForm = () => {
    setPhone("")
    setEmail("")
    setOrganization("")
    setKeywords("")
    setIsPublic(false)
    setAdditionalFields([])
  }

 const openEditModal = (lead: Lead) => {
    setEditingLead(lead)
    setEditPhone(lead.phone)
    setEditEmail(lead.email)
    setEditOrganization(lead.organization)
    setEditKeywords(lead.keywords)
    setEditIsPublic(lead.isPublic)
    setEditAdditionalFields([...lead.additionalFields])
    setIsEditModalOpen(true)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Basic validation
    // if (!phone.trim()) {
    //   toast({
    //     title: "Error",
    //     description: "Phone number is required",
    //     variant: "destructive",
    //   })
    //   return
    // }

    // Create new lead
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      phone,
      email,
      organization,
      keywords,
      isPublic,
      additionalFields: [...additionalFields],
      status: "New",
      created: new Date().toLocaleDateString(),
    }

    // Add to leads collection
    setLeads([newLead, ...leads])

    // Reset form
    resetForm()

    // Show success message
    // toast({
    //   title: "Success",
    //   description: "Lead created successfully",
    // })
  }

 const deleteLead = (id: string) => {
    // Filter out the lead with the matching id
    setLeads(leads.filter((lead) => lead.id !== id))

    // Show success message
    // toast({
    //   title: "Success",
    //   description: "Lead deleted successfully",
    // })
  }

   const addEditField = () => {
    const newId = `field-${editAdditionalFields.length + 1}`
    setEditAdditionalFields([...editAdditionalFields, { id: newId, name: "", value: "" }])
  }

const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!editingLead) return

    // Basic validation
    if (!editPhone.trim()) {
    //   toast({
    //     title: "Error",
    //     description: "Phone number is required",
    //     variant: "destructive",
    //   })
      return
    }
}
  return (
    <div className="">

      <ImportDialog openDialog={open} setOpen={setOpen} />
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center font-semibold">
                LA
              </div> */}
              {/* <h1 className="text-lg font-medium">Lead Acquisition Hub</h1> */}
            </div>
            <div className="flex items-center gap-2">
                 <Button
                onClick={() => setOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Import 
              </Button>
              <span className="text-sm"></span>
              {/* <ChevronDown className="h-4 w-4" /> */}
              <Button variant="ghost" size="icon" className="ml-2">
                <span className="sr-only">Help</span>
                <div className="rounded-full border w-6 h-6 flex items-center justify-center text-sm">?</div>
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-blue-600 hover:underline cursor-pointer"> Leads</span>
              <span>&gt;</span>
              <span className="text-blue-600 hover:underline cursor-pointer">Create Leads</span>
              {/* <span>&gt;</span> */}
              {/* <span>Save</span> */}
            </div>
            <Button variant="ghost" size="sm" className="text-gray-600 flex items-center gap-1" onClick={resetForm}>
              <RefreshCw className="h-4 w-4" />
              <span>Reset form</span>
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-medium mb-2">Create New Lead</h2>
              <p className="text-gray-500 mb-6 text-sm">Enter contact details to create a new lead profile</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      className="pl-10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      placeholder="contact@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="organization" className="block mb-2 text-sm font-medium">
                  Organization
                </label>
                <Select value={organization} onValueChange={setOrganization}>
                  <SelectTrigger id="organization" className="w-full">
                    <SelectValue placeholder="Select an organization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Organization 1">Organization 1</SelectItem>
                    <SelectItem value="Organization 2">Organization 2</SelectItem>
                    <SelectItem value="Organization 3">Organization 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <label htmlFor="keywords" className="block mb-2 text-sm font-medium">
                  Keywords (comma separated)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Hash className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="keywords"
                    placeholder="sales, enterprise, high-priority"
                    className="pl-10"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Additional Information</label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 flex items-center gap-1"
                    onClick={addField}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add field</span>
                  </Button>
                </div>

                {additionalFields.map((field) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      placeholder="Field name (e.g. fullName)"
                      value={field.name}
                      onChange={(e) => updateFieldName(field.id, e.target.value)}
                    />
                    <Input
                      placeholder="Value"
                      value={field.value}
                      onChange={(e) => updateFieldValue(field.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Checkbox
                  id="public"
                  checked={isPublic}
                  onCheckedChange={(checked) => setIsPublic(checked as boolean)}
                />
                <label htmlFor="public" className="text-sm">
                  Make this lead publicly searchable
                </label>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Lead
                </Button>
              </div>
            </div>
          </form>

          <div className="bg-white border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-medium">Recent Leads</h2>
              <div className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs font-medium">
                {leads.length}
              </div>
            </div>
            <p className="text-gray-500 mb-6 text-sm">Your most recently created leads</p>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CONTACT</TableHead>
                  <TableHead>ORGANIZATION</TableHead>
                  <TableHead>KEYWORDS</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>CREATED</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      No leads created yet. Fill out the form above to create your first lead.
                    </TableCell>
                  </TableRow>
                ) : (
                  leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="font-medium">{lead.phone}</div>
                        {lead.email && <div className="text-sm text-gray-500">{lead.email}</div>}
                      </TableCell>
                      <TableCell>{lead.organization || "-"}</TableCell>
                      <TableCell>
                        {lead.keywords.split(",").map(
                          (keyword, index) =>
                            keyword.trim() && (
                              <span
                                key={index}
                                className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                              >
                                {keyword.trim()}
                              </span>
                            ),
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {lead.status}
                        </span>
                      </TableCell>
                      <TableCell>{lead.created}</TableCell>
                    <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => openEditModal(lead)}
                          >
                            <PencilIcon className="h-4 w-4" />
                            <span className="sr-only">Edit lead</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => deleteLead(lead.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete lead</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        {/* <Toaster /> */}
      </div>
    {/* </ToastProvider> */}
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Lead</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label htmlFor="edit-phone" className="block mb-2 text-sm font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="edit-phone"
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="edit-email" className="block mb-2 text-sm font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="edit-email"
                        placeholder="contact@example.com"
                        className="pl-10"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="edit-organization" className="block mb-2 text-sm font-medium">
                    Organization
                  </label>
                  <Select value={editOrganization} onValueChange={setEditOrganization}>
                    <SelectTrigger id="edit-organization" className="w-full">
                      <SelectValue placeholder="Select an organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Organization 1">Organization 1</SelectItem>
                      <SelectItem value="Organization 2">Organization 2</SelectItem>
                      <SelectItem value="Organization 3">Organization 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <label htmlFor="edit-keywords" className="block mb-2 text-sm font-medium">
                    Keywords (comma separated)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Hash className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="edit-keywords"
                      placeholder="sales, enterprise, high-priority"
                      className="pl-10"
                      value={editKeywords}
                      onChange={(e) => setEditKeywords(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Additional Information</label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 flex items-center gap-1"
                      onClick={addEditField}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add field</span>
                    </Button>
                  </div>

                  {editAdditionalFields.map((field) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input
                        placeholder="Field name (e.g. fullName)"
                        value={field.name}
                        onChange={(e) => updateEditFieldName(field.id, e.target.value)}
                      />
                      <Input
                        placeholder="Value"
                        value={field.value}
                        onChange={(e) => updateEditFieldValue(field.id, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Checkbox
                    id="edit-public"
                    checked={editIsPublic}
                    onCheckedChange={(checked) => setEditIsPublic(checked as boolean)}
                  />
                  <label htmlFor="edit-public" className="text-sm">
                    Make this lead publicly searchable
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Update Lead
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
    </div>
  );
};

export default LeadsCreationPage;
