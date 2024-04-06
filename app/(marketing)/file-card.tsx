import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  name: string;
};

export const FileCard = ({ name }: Props) => {
  return (
    <div className="shadow-lg hover:shadow-none shadow-cyan-500/20 rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button>Download</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
