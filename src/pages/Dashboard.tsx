import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ThemeToggle'
import { User, Mail, LogOut } from 'lucide-react'

export function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/signin')
  }

  // Get initials for avatar
  const getInitials = () => {
    if (user?.name) {
      return user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return user?.email?.[0]?.toUpperCase() || '?'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button 
                onClick={handleSignOut} 
                variant="ghost" 
                size="sm"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card - Spans 2 columns on desktop */}
          <Card className="md:col-span-2 border-2">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/20">
                    <span className="text-2xl font-semibold text-primary">
                      {getInitials()}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      {user?.name || 'Welcome'}
                    </CardTitle>
                    <CardDescription className="text-base mt-1">
                      Your profile information
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Email Address
                    </p>
                    <p className="text-base font-medium truncate mt-0.5">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {user?.name && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Full Name
                      </p>
                      <p className="text-base font-medium truncate mt-0.5">
                        {user.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" disabled>
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                Settings
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                Privacy
              </Button>
              <div className="pt-2">
                <Button 
                  onClick={handleSignOut} 
                  variant="destructive" 
                  className="w-full gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Message */}
        <Card className="mt-6 border-2 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👋</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
                </h3>
                <p className="text-muted-foreground">
                  You're successfully signed in and ready to go. This is your personal dashboard where you can manage your profile and account settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}