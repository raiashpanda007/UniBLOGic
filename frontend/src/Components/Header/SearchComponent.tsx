import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Search } from "@/assets/Icons/Icons";
function SearchComponent() {
  return (
    <div>
      <form className="flex items-center space-x-2">
        <Input
          id="search"
          placeholder="Search ..."
          className="placeholder:text-gray-500 placeholder:opacity-75"
        />
        <Button>
          <Search className="w-6 h-6 " />
        </Button>
      </form>
    </div>
  );
}

export default SearchComponent;
