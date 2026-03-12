import { PlaceholderPage } from "@/components/PlaceholderPage";
import { TopNavigation } from "@/components/TopNavigation";
import { SidebarNavigation } from "@/components/SidebarNavigation";

export default function FeedPage() {
    return (
        <main className="flex min-h-screen bg-background text-foreground">
            <SidebarNavigation />
            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b border-border flex items-center justify-between px-4 sticky top-0 bg-background/80 backdrop-blur-md z-30">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold">Discover</h1>
                    </div>
                    <TopNavigation />
                </header>
                <div className="p-8">
                    <PlaceholderPage
                        title="Discover AI Minds"
                        description="Explore our growing library of historical thinkers, scientists, and philosophers. This discovery feed will feature trending characters and personalized recommendations."
                    />
                </div>
            </div>
        </main>
    );
}
