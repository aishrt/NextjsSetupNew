"use client"
// import React, {useEffect, useRef} from "react";
import {AsyncPaginate} from "react-select-async-paginate";
import {API_ROUTES} from "@/@core/apiRoutes";
import {isEmpty} from "@/utils/isEmpty";
import {commonFetcherFn} from "@/@core/apiFetcher";
import {createQueryString} from "@/@core/tableFunctions";
import {DEFAULT_ROW_PER_PAGE} from "@/constants/pagination";

type Props = {
  searchType: string,
  placeholder?: string,
  isMulti?: boolean,
  dataParam?: any,
  isClearable?: boolean,
  isDisabled?: boolean,
  className?: string,
  error?: any,
  selectBoxKey?: string,
  [key: string]: any;
}
const SelectAsync = ({
  searchType,
  placeholder,
  isMulti = false,
  dataParam,
  isClearable = false,
  isDisabled,
  className = "",
  error,
  selectBoxKey = "",
  ...props
}: Props) => {
  // const source = cancelToken.source();
  // const cancelTokensRef = useRef([]);

  const urls: any = {
    domainListing: `${API_ROUTES.DOMAINS_LIST}?is_verify=true`,
  };
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      height: "56px",
      borderRadius: "4px",
      borderColor: error && error ? "#e74c3c" : provided.borderColor,
      color: error && error ? "#e74c3c" : provided.color,
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      position: "absolute",
      backgroundColor: "#fff",
      zIndex: "99999",
      marginTop: "0px",
      boxShadow:
        "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)",
    }),
    listbox: (provided: any, state: any) => ({
      ...provided,
      maxHeight: "150px",
      overflowY: "auto",
    }),
    placeholder: (provided: any, state: any) => ({
      ...provided,
      color: error && error ? "#e74c3c" : provided.color,
    }),
  };

  const getListOptions = (resData: any) => {
    let options = [];
    let hasMore = resData.meta.has_more;
    switch (searchType) {
      case "domainListing": {
        options = [...resData.data].map((o, idx) => {
          return {
            value: o?.domain,
            label: o?.domain,
            ...o,
          };
        });
        break;
      }
      default: {
        //
        options = [...resData.data].map((o, idx) => {
          return {
            value: o?.id,
            label: o?.name,
            ...o,
          };
        });
        break;
      }
    }
    return { options, hasMore };
  };

  const loadOptions = async (searchText: string, prevOptions: any, { page }: any) => {
    let queryObject = {
      search_text: searchText || "",
      page,
      page_size: DEFAULT_ROW_PER_PAGE
    };
    const finalUrl = createQueryString(queryObject, urls[searchType]);
    try {
      const res = await commonFetcherFn(finalUrl, "GET", null, false, true);
      if (res && !isEmpty(res.data)) {
        return {
          ...getListOptions(res),
          additional: {
            page: page + 1,
          },
        };
      }
    } catch (e) {
      return {
        options: [],
        hasMore: false,
        additional: {
          page: page + 1,
        },
      };
    }
    return {
      options: [],
      hasMore: false,
      additional: {
        page: page + 1,
      },
    };
  };

  /*const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        <div
          style={{
            fontStyle: _.includes(["UNASSIGNED"], props.data.value)
              ? "italic"
              : "normal",
          }}
        >
          {props.data.label}
        </div>
      </components.Option>
    );
  };*/
  return (
    <>
      <AsyncPaginate
        {...props}
        key={selectBoxKey ? selectBoxKey : searchType}
        debounceTimeout={500}
        loadOptions={loadOptions}
        isMulti={isMulti}
        placeholder={placeholder}
        isClearable={isClearable}
        isDisabled={isDisabled}
        className={`select-async ${className}`}
        closeMenuOnSelect={!isMulti}
        additional={{
          page: 1,
        }}
        styles={customStyles}
        defaultMenuIsOpen={false}
        // components={{ Option: CustomOption }}
        // menuPlacement="top"
      />
    </>
  );
};
export default SelectAsync;
