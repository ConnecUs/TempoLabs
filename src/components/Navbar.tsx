import { Button } from "./ui/button";
import { Home, Settings, Image as ImageIcon } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold">Prompt Manager</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => (window.location.href = "/")}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => (window.location.href = "/gallery")}
              >
                <ImageIcon className="h-4 w-4" />
                Gallery
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
