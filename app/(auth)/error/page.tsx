'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

function ErrorCard() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <Card className="w-[380px]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <CardTitle>Authentication Error</CardTitle>
        </div>
        <CardDescription>
          {error || 'An error occurred during authentication'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <Link href="/auth/login">Try Again</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function AuthError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorCard />
      </Suspense>
    </div>
  )
}