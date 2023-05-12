import ReactPaginate from "react-paginate";
import AdCard from "../components/AdCard";
import "../styles/index.scss";
import { useEffect, useState } from "react";
import { useRefreshIndexPage } from "../components/RefreshIndexPageProvider";

interface Data {
  id: number;
  phoneNumber: string;
  address: string;
  coordinates: [lat: number, lng: number];
  description: string;
  userId: number;
}

const Index = () => {
  // current page number
  const [pageNumber, setPageNumber] = useState(1);
  const [ads, setAds] = useState<Data[]>([]);
  // for making pagination
  const [totalCount, setTotalCount] = useState(0);
  // for refreshing index page data
  const { refresh } = useRefreshIndexPage();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/advertisements?_page=${pageNumber}&_limit=20&_sort=id&_order=desc`
        );
        if (res.ok) {
          const data = await res.json();
          setAds(data);
          const tc = res.headers.get("X-Total-Count");
          setTotalCount(tc ? Number(tc) : 0);
        }
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    };
    loadData();
  }, [pageNumber, refresh]);

  const handlePageClick = (e: any) => {
    const nextPage = e.selected + 1;
    setPageNumber(nextPage);
  };

  return (
    <>
      <main className="index">
        <div className="ad-container">
          {ads.length > 0 ? (
            ads.map((ad) => (
              <AdCard key={ad.id} address={ad.address} id={ad.id} />
            ))
          ) : (
            <p className="no-ads">آگهی برای نمایش وجود ندارد!</p>
          )}
        </div>
      </main>
      {Math.ceil(totalCount / 20) > 1 && (
        <div className="pagination-container" style={{ direction: "rtl" }}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={totalCount ? Math.ceil(totalCount / 20) : 0}
            previousLabel="<"
            renderOnZeroPageCount={() => null}
          />
        </div>
      )}
    </>
  );
};

export default Index;
