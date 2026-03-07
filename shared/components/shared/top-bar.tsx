import { cn } from "@/shared/lib/utils";
import React from "react";
import Container from "./container";
import Categories from "./categories";
import SortPopup from "./sort-popup";
import { Category } from "@prisma/client";

interface Props {
    className?: string;
    categories:Category[]
}

const TopBar:React.FC<Props> = ({className, categories}) => {
    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
        
        <Container>

            <Categories 
            items={categories}
            className="mr-120" />

            {/* <SortPopup /> */}
        </Container>
        </div>
    )
}

export default TopBar;