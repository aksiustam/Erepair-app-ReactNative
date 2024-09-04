"use client";
import { useState } from "react";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import {
  useSort,
  HeaderCellSort,
  SortToggleType,
} from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/material-ui";
import { FaChevronDown, FaChevronUp, FaRegEdit } from "react-icons/fa";
import "./tablecss.css";

const HomePage = (props) => {
  const pdata = props.user || [];

  const [search, setSearch] = useState("");

  const filteredData =
    search === ""
      ? pdata
      : pdata?.filter(
          (data) =>
            data?.name?.toLowerCase().includes(search?.toLowerCase()) ||
            data?.id?.toString().includes(search?.toLowerCase())
        );
  const data = { nodes: filteredData };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme({
    ...materialTheme,
    Table: `
      --data-table-library_grid-template-columns: repeat(5, 1fr);
    `,
  });
  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortToggleType: SortToggleType.AlternateWithReset,
      sortFns: {
        ID: (array) => array.sort((a, b) => b.id - a.id),
        SAYFA: (array) => array.sort((a, b) => b.sayfa - a.sayfa),
        DEVICEID: (array) =>
          array.sort((a, b) => a?.deviceID?.localeCompare(b?.deviceID)),
        NAME: (array) => array.sort((a, b) => a?.name?.localeCompare(b?.name)),
      },
    }
  );

  function onSortChange(action, state) {
    //console.log(action, state);
  }
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 10,
    },
    onChange: onPaginationChange,
  });
  function onPaginationChange(action, state) {}

  const totalPage = pagination?.state?.getTotalPages(data.nodes);

  return (
    <>
      <div className="flex flex-col w-full pt-4">
        <div className="w-full mt-2">
          <input
            type="text"
            placeholder="Ara"
            className="w-full h-12 bg-slate-200 px-4 border border-black"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex w-full overflow-x-scroll">
          <Table
            data={data}
            sort={sort}
            theme={theme}
            pagination={pagination}
            layout={{ custom: true, horizontalScroll: true }}
          >
            {(tableList) => (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCellSort sortKey="ID">
                      <span className="text-gray-600 text-center">ID</span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="NAME">
                      <span className="text-gray-600 text-center">Adı</span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="DEVICEID">
                      <span className="text-sm text-gray-600 text-center">
                        DeviceID
                      </span>
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="SAYFA">
                      <span className="text-sm text-gray-600 text-center">
                        Sayfa
                      </span>
                    </HeaderCellSort>
                    <HeaderCellSort>
                      <span className="text-sm text-gray-600 text-center">
                        Düzenle/Sil
                      </span>
                    </HeaderCellSort>
                  </HeaderRow>
                </Header>

                <Body>
                  {tableList?.map((item) => {
                    return (
                      <Row key={item?.id}>
                        <Cell className="hover:bg-slate-100 cursor-pointer">
                          #{item?.id}
                        </Cell>
                        <Cell className="hover:bg-slate-100 cursor-pointer">
                          {item?.name}
                        </Cell>
                        <Cell className="hover:bg-slate-100 cursor-pointer">
                          {item?.deviceID}
                        </Cell>
                        <Cell>{item?.sayfa}</Cell>

                        <Cell>
                          <button>
                            <FaRegEdit size={26} color="green" />
                          </button>
                        </Cell>
                      </Row>
                    );
                  })}
                </Body>
              </>
            )}
          </Table>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between gap-4 mb-12">
            <span className="font-bold">Toplam Sayfa: {totalPage}</span>
            <div className="flex items-center justify-center gap-2 mr-12">
              <span className="font-bold">
                Sayfa : {pagination?.state?.page + 1}
              </span>

              <button
                type="button"
                className="theme-btn-one p-1 text-xl bg-stone-200 "
                disabled={pagination?.state?.page === 0}
                onClick={() => pagination.fns.onSetPage(0)}
              >
                {"|<"}
              </button>
              <button
                type="button"
                className="theme-btn-one p-1 text-xl bg-stone-200 "
                disabled={pagination?.state?.page === 0}
                onClick={() =>
                  pagination.fns.onSetPage(pagination.state.page - 1)
                }
              >
                {"<"}
              </button>
              <button
                type="button"
                className="theme-btn-one p-1 text-xl bg-stone-200 "
                disabled={pagination?.state?.page + 1 === totalPage}
                onClick={() =>
                  pagination.fns.onSetPage(pagination.state.page + 1)
                }
              >
                {">"}
              </button>
              <button
                type="button"
                className="theme-btn-one p-1 text-xl bg-stone-200 "
                disabled={pagination?.state?.page + 1 === totalPage}
                onClick={() => pagination.fns.onSetPage(totalPage - 1)}
              >
                {">|"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
