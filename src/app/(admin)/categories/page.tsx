import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CategoryTable from "@/components/categories/CategoryTable";
import CreateCategoryModal from "@/components/categories/CreateCategoryModal";

export default async function categoriesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/categories`, {
    cache: "no-store",
  });

  const categories = await res.json();


  return (
    <div>
      <PageBreadcrumb pageTitle="Categories" />
      <div className="space-y-6">
        <ComponentCard title="">
           <div className="flex justify-end mb-4">
              <CreateCategoryModal />
            </div>
          <CategoryTable categories={categories} />
        </ComponentCard>
      </div>
    </div>
  );
}