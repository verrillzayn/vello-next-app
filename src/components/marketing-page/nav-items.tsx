import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { PRODUCT_CATEGORIES } from "@/config";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NavItems = () => {
  return (
    <Menubar className="flex h-full gap-4 border-none">
      {PRODUCT_CATEGORIES.map((category, i) => {
        return (
          <MenubarMenu key={category.label}>
            <MenubarTrigger className="group/trigger cursor-pointer py-2 hover:bg-accent hover:text-accent-foreground">
              {category.label}{" "}
              <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground transition-all group-data-[state=open]/trigger:-rotate-180" />
            </MenubarTrigger>
            <MenubarContent className="text-sm text-muted-foreground">
              <div className="min-h-[55vh] w-screen">
                <div className="relative mx-auto max-w-7xl px-8">
                  <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                    <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                      {category.featured.map((item) => (
                        <div
                          key={item.name}
                          className="group relative text-base sm:text-sm"
                        >
                          <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary group-hover:opacity-75">
                            <Image
                              src={item.imageSrc}
                              alt="product category image"
                              fill
                              className="object-cover object-center"
                            />
                          </div>
                          <Link
                            href={item.href}
                            className="mt-6 block font-medium text-foreground"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1">Shop now!</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </MenubarContent>
          </MenubarMenu>
        );
      })}
    </Menubar>
  );
};

export default NavItems;

// import NavItem from "@/components/marketing-page/nav-item";
// import { PRODUCT_CATEGORIES } from "@/config";
// import { useState } from "react";

// const NavItems = () => {
//   const [activeIndex, setActiveIndex] = useState<null | number>(null);

//   const isAnyOpen = activeIndex !== null;

//   return (
//     <div className="flex h-full gap-4 border-2 border-red-600">
//       {PRODUCT_CATEGORIES.map((category, i) => {
//         const handleOpen = () => {
//           if (activeIndex === i) {
//             setActiveIndex(null);
//           } else {
//             setActiveIndex(i);
//           }
//         };

//         const isOpen = i === activeIndex;
//         return (
//           <NavItem
//             category={category}
//             handleOpen={handleOpen}
//             isOpen={isOpen}
//             key={category.value}
//             isAnyOpen={isAnyOpen}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default NavItems;
