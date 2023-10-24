import getSongsByTitle from "@/app/actions/getSongsByTitle";
import Container from "@/app/components/UI/Container";
import SearchSlugClient from "./SearchSlugClient";

const SearchSlugPage = async ({ params }: { params: { slug: string[] } }) => {
  const songs = await getSongsByTitle(params);

  if (songs?.length === 0 || songs === null) {
    return <p>No Results</p>;
  }

  return (
    <Container>
      <div className="flex flex-row bg-gray-900">
        <div className="w-full flex flex-row">
          <SearchSlugClient songs={songs} />
        </div>
      </div>
    </Container>
  );
};

export default SearchSlugPage;
