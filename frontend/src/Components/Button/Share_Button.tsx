import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Share } from "@/assets/Icons/Icons";
import { useSelector } from "react-redux";
import type { RootState } from "../../Store/Store";

function Share_Button() {
  const { toast } = useToast();
  const mode = useSelector((state: RootState) => state.theme.mode);

  // Determine button color based on theme
  const buttonColor = mode === 'light' ? '#000000' : '#ffffff'; // Example colors for light and dark themes

  return (
    <Button
      variant="ghost"
      onClick={() => {
        toast({
          title: "Link is copied to clipboard",
          description: "Share the link with your friends",
        });
        console.log("Share Button Clicked");
      }}
      style={{
        color: buttonColor, // Set button text color based on theme
        borderColor: buttonColor, // Set button border color based on theme
      }}
    >
      <Share />
    </Button>
  );
}

export default Share_Button;
