"use client";

import { PropsWithChildren } from "react";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function Detail({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-2 justify-center">{children}</div>;
}

type EditProps = BaseDetailProps & {
  showEditButton: true;
  editHref: string;
  editButtonText: string;
};

type BaseDetailProps = {
  headingText: string;
  subHeadingText?: string;
  backLocationHref?: string;
};

type DetailHeaderProps = EditProps | BaseDetailProps;

export function DetailHeader(props: DetailHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-2 mb-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          if (props.backLocationHref) {
            router.push(props.backLocationHref);
            return;
          }
          router.back();
        }}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="w-full flex items-center justify-between px-2">
        <div className="grid gap-1 ">
          <h1 className="font-semibold text-2xl md:text-3xl tracking-tighter">
            {props.headingText}
          </h1>
          {props.subHeadingText && (
            <p className="text-lg text-muted-foreground">
              {props.subHeadingText}
            </p>
          )}
        </div>
        {"showEditButton" in props ? (
          <Button asChild>
            <Link href={`${pathname}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              {props.editButtonText}
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
