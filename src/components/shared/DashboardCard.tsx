import React from "react";
import { Card, CardContent, Typography, Stack, Box } from "@mui/material";
import { usePathname } from "next/navigation";
import InformationTooltip from "@/components/InformationTooltip";type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
  keys?: boolean;
  component?: string | JSX.Element;
};

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  keys,
  component,
}: Props) => {
  const pathname = usePathname();

  const customStyle = {
    boxShadow: "none",
    border: "1px solid #dee2e6",
    borderRadius: "4px",
    overflow: "visible"
  };
  const volumeStyle = "volumeCardHeight";

  const sourceStyle = "sourceCardHeight";
  // className={ pathname === "/dashboard/dashboard" ? "yashi" : "sourceVolume"}
  return (
    <Card
      className={component == "volume" ? volumeStyle : sourceStyle}
      sx={{ padding: 0, marginTop: 3 }}
      elevation={5}
      variant={undefined}
      style={customStyle}
    >
      {cardheading ? (
        <CardContent>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textPrimary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: "30px" }}>
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={"center"}
              mb={3}
            >
              <Box className="d-flex align-item-center">
                {title ? (
                  <>
                    <Typography variant="h5">{title}</Typography>

                    <span>
                      {title == "A" && (
                        <InformationTooltip name="tool_A_hd" position="right" />
                      )}
                      {title == "AAAA" && (
                        <InformationTooltip
                          name="tool_AAAA_hd"
                          position="right"
                        />
                      )}
                      {title == "MX" && (
                        <InformationTooltip
                          name="tool_MX_hd"
                          position="right"
                        />
                      )}
                      {title == "TXT" && (
                        <InformationTooltip
                          name="tool_TXT_hd"
                          position="right"
                        />
                      )}
                      {title == "CNAME" && (
                        <InformationTooltip
                          name="tool_CNAME_hd"
                          position="right"
                        />
                      )}
                      {title == "NS" && (
                        <InformationTooltip
                          name="tool_NS_hd"
                          position="right"
                        />
                      )}
                      {title == "PTR" && (
                        <InformationTooltip
                          name="tool_PTR_hd"
                          position="right"
                        />
                      )}
                      {title == "SRV" && (
                        <InformationTooltip
                          name="tool_SRV_hd"
                          position="right"
                        />
                      )}
                      {title == "SOA" && (
                        <InformationTooltip
                          name="tool_SOA_hd"
                          position="right"
                        />
                      )}
                      {title == "CAA" && (
                        <InformationTooltip
                          name="tool_CAA_hd"
                          position="right"
                        />
                      )}
                      {title == "DS" && (
                        <InformationTooltip
                          name="tool_DS_hd"
                          position="right"
                        />
                      )}
                      {title == "DNSKEY" && (
                        <InformationTooltip
                          name="tool_DNSKEY_hd"
                          position="right"
                        />
                      )}
                    </span>
                  </>
                ) : (
                  ""
                )}

                {subtitle ? (
                  <Typography variant="subtitle2" color="textPrimary">
                    {subtitle}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              {action}
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
