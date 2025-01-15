import React, { type PropsWithChildren } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionIcon,
  AccordionTitleText,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/ui/icon";

interface CustomAccordionItemProps {
  value: string;
  itemHeader: string;
  itemContent: React.ReactNode;
}

export function CustomAccordion({ children }: PropsWithChildren<unknown>) {
  return <Accordion className=" w-full">{children}</Accordion>;
}

export function CustomAccordionItem({
  value,
  itemHeader,
  itemContent,
}: CustomAccordionItemProps) {
  return (
    <AccordionItem value={value} className="rounded-lg">
      <AccordionHeader>
        <AccordionTrigger className="focus:web:rounded-lg">
          {({ isExpanded }) => {
            return (
              <>
                {isExpanded ? (
                  <AccordionIcon as={ChevronUpIcon} className="mr-3" />
                ) : (
                  <AccordionIcon as={ChevronDownIcon} className="mr-3" />
                )}
                <AccordionTitleText style={{ fontSize: 20 }}>
                  {itemHeader}
                </AccordionTitleText>
              </>
            );
          }}
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent>{itemContent}</AccordionContent>
    </AccordionItem>
  );
}
