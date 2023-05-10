import ReactPaginate from "react-paginate";
import AdCard from "../components/AdCard";
import "../styles/index.scss"

const Index = () => {
  return (
    <main>
      <div className="ad-container">
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
      </div>
      <div className="pagination-container" style={{ direction: "rtl" }}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          pageRangeDisplayed={4}
          pageCount={30}
          previousLabel="<"
          renderOnZeroPageCount={() => null}
        />
      </div>
    </main>
  );
};

export default Index;
