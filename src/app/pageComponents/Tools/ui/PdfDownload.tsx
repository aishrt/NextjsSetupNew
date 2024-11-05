import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import GaugeChart from "react-gauge-chart";
import { isEmpty } from "@/utils/isEmpty";

const ProgressBar = ({ percentage, colorClass }: any) => {
  const progressStyles = {
    backgroundColor: colorClass === "success" ? "#4caf50" : "#f44336", // Green for success, Red for danger
    width: `${percentage}%`,
    height: 10,
    borderRadius: 5,
  };

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
        marginVertical: 5,
      }}
    >
      <View style={progressStyles} />
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  table: {
    width: "100%",
    marginBottom: 20,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableCell: {
    width: "50%",
    padding: 10,
  },
  card: {
    border: "1px solid #c3c3c3",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 600,
    textAlign: "center",
  },
  cardContent: {
    fontSize: 20,
    color: "#198754",
    fontWeight: 600,
    textAlign: "center",
  },
  cardContentData: {
    fontSize: "14px",
    textAlign: "center",
  },
  yellowWaring: {
    border: "1px solid rgb(255, 156, 0)",
    borderRadius: 8,
    backgroundColor: "rgba(255, 156, 0, 0.1)",
    marginBottom: 10,
    fontSize: 20,
    color: "rgb(255, 156, 0)",
  },
  yellowWaringSpan: {
    backgroundColor: "rgb(255, 156, 0)",
    borderRadius: "8px 0 0 8px",
    width: 40,
    height: 40,
    marginRight: 8,
  },
  span: {
    backgroundColor: "rgb(255, 156, 0)",
    fontSize: 14,
    color: "#fff",
    padding: "3px 8px",
    margin: "8px 8px 0 0",
    borderRadius: 4,
    float: "right",
  },
  gaugeContainer: {
    height: 30,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
    flexDirection: "row",
  },
});

const PdfDownload = ({ scannerResult, detailed, percent = 0.65 }: any) => {
  const gaugeColor =
    percent < 0.33 ? "#FF5F6D" : percent < 0.66 ? "#FFC371" : "#4CAF50";
  const mergeArrays = (scannerResult: any, detailed: any) => {
    const merged = scannerResult.map((item1: any) => {
      // Find matching item in the second array
      const item2 = detailed.find(
        (item: any) => item.title.toUpperCase() === item1.heading.toUpperCase()
      );
      // Return a new object with combined properties
      return {
        heading: item1.heading,
        title: item1.title,
        subtitle: item1.subtitle,
        detailedSubtitle: item2.subtitle,
        barColorClass: item1.barColorClass,
        recordValue: item2 ? item2.recordValue : null,
        warnings: item2 ? item2.warnings : null,
        link: item2 ? item2.link : null,
        colorClass: item2 ? item2.colorClass : null,
      };
    });
    return merged;
  };

  // Merged array
  const mergedArray = mergeArrays(scannerResult, detailed);
  const getBarColorClass = (title: any) =>
    typeof title == "object"
      ? title?.length > 0 &&
        title?.map((item: any) => {
          return !isEmpty(item) &&
            ["valid", "active", "accept"].includes(item?.toLowerCase())
            ? "success"
            : "danger";
        })
      : !isEmpty(title) &&
        ["valid", "active", "accept"].includes(title?.toLowerCase())
      ? "success"
      : "danger";
  console.log(mergedArray, "mergedArraymergedArray");
  const BLACKLIST_TRUE = "You are blacklisted";
  const BLACKLIST_FALSE = "You are not blacklisted";
  const getValidClass = (obj: any) => {
    let colorClass = "danger";
    let iconClass = "fa-close";
    function getColorClass(
      errors: any,
      warnings: any,
      recordValue: any,
      title: string
    ) {
      return !isEmpty(errors)
        ? "danger"
        : !isEmpty(warnings)
        ? "warning"
        : (!isEmpty(recordValue) &&
            title?.toLowerCase() !== "blacklist domain") ||
          (!isEmpty(recordValue) &&
            title?.toLowerCase() === "blacklist domain" &&
            recordValue === BLACKLIST_FALSE)
        ? "success"
        : "danger";
    }
    function getIconClass(
      errors: any,
      warnings: any,
      recordValue: any,
      title: string
    ) {
      return !isEmpty(errors)
        ? "fa-close"
        : !isEmpty(warnings)
        ? "fa-triangle-exclamation"
        : (!isEmpty(recordValue) &&
            title?.toLowerCase() !== "blacklist domain") ||
          (!isEmpty(recordValue) &&
            title?.toLowerCase() === "blacklist domain" &&
            recordValue === BLACKLIST_FALSE)
        ? "fa-check"
        : "fa-close";
    }
    if (typeof obj?.recordValue == "object") {
      obj.recordValue?.map((item: any, index: number) => {
        colorClass = getColorClass(
          obj.errors?.[index],
          obj.warnings?.[index],
          item,
          obj?.title?.[index]
        );
        iconClass = getIconClass(
          obj.errors?.[index],
          obj.warnings?.[index],
          item,
          obj?.title?.[index]
        );
      });
    } else if (!isEmpty(obj)) {
      colorClass = getColorClass(
        obj?.errors,
        obj?.warnings,
        obj?.recordValue,
        obj?.title
      );
      iconClass = getIconClass(
        obj?.errors,
        obj?.warnings,
        obj?.recordValue,
        obj?.title
      );
    }
    return {
      colorClass,
      iconClass,
    };
  };
  const gaugeBar = (percentage: any) => ({
    height: "100%",
    width: `${percentage * 100}%`,
    backgroundColor: percentage > 0.7 ? "#4caf50" : "#ff9800", // Green if >70%, else Orange
    borderRadius: 5,
  });
  console.log("detaileddetailed", detailed);
  console.log("scannerResultscannerResultscannerResult", scannerResult);
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>
          Scanner results for{" "}
          <Text style={{ color: "#eb5454" }}>softuvo.com</Text> domain
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Overall Result Score</Text>
                <View style={styles.section}>
                  <Text style={{ marginBottom: 10, textAlign: "center" }}>
                    Overall Result Score
                  </Text>
                  <View style={styles.gaugeContainer}>
                    <View style={gaugeBar(percent)} />
                  </View>
                  <Text style={{ textAlign: "center", marginTop: 10 }}>
                    {percent >= 0.66
                      ? "High"
                      : percent >= 0.33
                      ? "Medium"
                      : "Low"}{" "}
                    Security Level
                  </Text>
                </View>
                <Text style={styles.cardContent}>HIGH</Text>
                <Text style={styles.cardContentData}>
                  A domain with a high security level has strong SPF, DKIM, and
                  DMARC configurations.
                </Text>
                <Text style={styles.yellowWaring}>
                  <Text style={styles?.yellowWaringSpan}></Text>Warnings
                  Detected <Text style={styles?.span}>1</Text>
                </Text>

                <Text style={styles.yellowWaring}>
                  <Text style={styles?.yellowWaringSpan}></Text>Warnings
                  Detected <Text style={styles?.span}>1</Text>
                </Text>
              </View>
            </View>
            <View style={styles.tableCell}></View>
          </View>
        </View>
      </Page>
      {mergedArray?.length > 0 &&
        mergedArray?.map((val: any, idx: number) => (
          <Page style={styles.page} key={idx}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <View style={styles.card}>
                    <Text style={styles.cardTitle}>{val?.heading}</Text>
                    <ProgressBar
                      percentage={100}
                      colorClass={getBarColorClass(val?.title)}
                    />
                    <Text style={styles.cardContentData}>{val?.subtitle}</Text>
                  </View>
                  <View style={styles.card}>
                    <div>Helo</div>
                    <Text style={styles.cardTitle}>{val?.heading}</Text>
                    <Text style={styles.cardContentData}>
                      {val?.detailedSubtitle}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Page>
        ))}
    </Document>
  );
};

export default PdfDownload;
