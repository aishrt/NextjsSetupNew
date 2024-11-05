import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SxProps, Theme } from "@mui/system";
import { useStore } from "@/utils/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface DateRangePickerProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStartDate: (date: Dayjs | null) => void;
  setEndDate: (date: Dayjs | null) => void;
}

const labelStyle: SxProps<Theme> = {
  backgroundColor: "#fff",
  color: "#000",
  padding: "0 4px",
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const { licenseValidation } = useStore();
  const router = useRouter();

  const slotProps = {
    textField: {
      sx: {
        "& label": labelStyle,
      },
    },
    popper: {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
        {
          name: "preventOverflow",
          options: {
            altBoundary: true,
            rootBoundary: "viewport",
            tether: false,
          },
        },
      ],
    },
  };

  let updatedStartDate = startDate ? dayjs(startDate) : null;
  let updatedEndDate = endDate ? dayjs(endDate) : null;

  const historyDateData = licenseValidation.historyDate;
  if (licenseValidation.historyDate && updatedStartDate) {
    const updatedDate = dayjs(updatedStartDate);
    const [month, day, year] = historyDateData.split("/");
    const historyDate = dayjs(`${year}-${month}-${day}`);
    // if (updatedDate.isBefore(historyDate)) {
    //   updatedStartDate = null;
    //   updatedEndDate = null;
    //   router.push("/upgrade-plan");
    // }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          height: "56px",
          position: "relative",
        }}
      >
        {/* Start Date Picker */}
        <DatePicker
          label="Start Date"
          value={updatedStartDate}
          onChange={(date: Dayjs | null) => setStartDate(date)}
          slotProps={slotProps}
          maxDate={dayjs()}
          className="dateWidth"
        />

        {/* End Date Picker */}
        <DatePicker
          label="End Date"
          value={updatedEndDate}
          onChange={(date: Dayjs | null) => setEndDate(date)}
          minDate={dayjs(startDate) || dayjs()} // Ensure endDate is after startDate
          maxDate={dayjs()}
          slotProps={slotProps}
          className="dateWidth"
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
