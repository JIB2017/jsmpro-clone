import Filters from "@/components/Filters";
import Header from "@/components/Header";
import ResourceCard from "@/components/ResourceCard";
import SearchForm from "@/components/SearchForm";
import { getResources } from "@/sanity/actions";

export const revalidate = 900;

interface Props {
  searchParams: { [key: string]: string | undefined }
};

const Page = async ({searchParams}: Props) => {
  console.log(searchParams.query);
  
  const resources = await getResources({
    query: searchParams?.query || "",
    category: searchParams?.category || "",
    page: "1",
  });

  // console.log(resources);
  
  return (
    <main className="flex-center flex-col paddings mx-auto w-full max-w-screen-2xl">
      <section className="nav-padding w-full">
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-banner bg-cover bg-center text-center">
          <h1 className="sm:heading1 heading2 mb-6 text-center text-white">JavaScript Mastery Resources</h1>
        </div>
        <SearchForm />
      </section>

      <Filters />

      { (searchParams?.query || searchParams?.category) && (
        <section className="flex-center mt-6 w-full flex-col sm:mt-20">
          <Header type="Resources" query={searchParams.query || ''} category={searchParams.category || ''} />

          {/* Here are all the cards */}
          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {resources?.length > 0 ? resources.map((resource: any) => (
              <ResourceCard key={resource._id} id={resource._id} title={resource.title} image={resource.image} downloadNumber={resource.views} />
            )) : <p className="body-regular text-white-400"> Resources not found</p>}
          </div>
        </section>

      )}
    </main>
  );
};

export default Page;
