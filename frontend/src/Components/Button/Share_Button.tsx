
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Share } from "@/assets/Icons/Icons";
function Share_Button() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Link is copied to clipboard",
          description: "Share the link with your friends",
          
        });
        console.log("Share Button Clicked");
      }}
    >
      <Share />
    </Button>
  );
}

export default Share_Button;
