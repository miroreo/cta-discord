import * as utils from "../utils.ts";

type CTAAlerts = {
  CTAAlerts: {
    TimeStamp: string;
    ErrorCode: string;
    ErrorMessage: string | null;
    Alert: RawAlert[];
  };
};
type RawAlert = {
  AlertId: string;
  Headline: string;
  ShortDescription: string;
  FullDescription: { "#cdata-section": string };
  SeverityScore: string;
  SeverityColor: string;
  SeverityCSS: string;
  Impact: string;
  EventStart: string;
  EventEnd: string;
  TBD: string;
  MajorAlert: string;
  AlertURL: { "#cdata-section": string };
  ImpactedService: {
    Service?: RawService[] | RawService;
  };
  ttim: string;
  GUID: string;
};
type RawService = {
  ServiceType: string;
  ServiceTypeDescription: string;
  ServiceName: string;
  ServiceId: string;
  ServiceBackColor: string;
  ServiceTextColor: string;
  ServiceURL: { "#cdata-section": string };
};
export type Alert = {
  alertId: number;
  headline: string;
  shortDescription: string;
  fullDescription: string;
  severityScore: number;
  severityColor: string;
  severityCSS: string;
  impact: string;
  eventStart: Date;
  eventEnd: Date | null;
  TBD: boolean;
  majorAlert: boolean;
  alertURL: string;
  impactedService: ImpactedService[];
  guid?: string;
};
type ImpactedService = {
  serviceType: "X" | "T" | "B" | "R";
  serviceTypeDescription: string;
  serviceName: string;
  serviceId: string;
  serviceBackColor: string;
  serviceTextColor: string;
  serviceURL: string;
};
export const getActiveAlerts = async (options?: {
  accessibility?: boolean;
  planned?: boolean;
  routes?: string[];
  recentDays?: number;
}) => {
  try {
    const url =
      `https://www.transitchicago.com/api/1.0/alerts.aspx?outputType=JSON&activeonly=true&accessibility=${
        options?.accessibility ? "true" : "false"
      }&planned=${options?.planned ? "true" : "false"}&routeid=${
        options?.routes?.join(",")
      }`;
    const response = await fetch(url);
    const data: CTAAlerts = await response.json();
    if (parseInt(data.CTAAlerts.ErrorCode) == 50) {
      return [];
    }
    if (parseInt(data.CTAAlerts.ErrorCode) !== 0) {
      throw new Error(data.CTAAlerts.ErrorMessage || "Unknown API Error");
    }
    return data.CTAAlerts.Alert.map((alert) => {
      // console.log(alert);
      if (!Array.isArray(!alert.ImpactedService?.Service)) {
        if (!alert.ImpactedService?.Service) {
          alert.ImpactedService = {
            Service: [],
          };
        } else {
          alert.ImpactedService.Service = [
            alert.ImpactedService.Service as RawService,
          ] as RawService[];
        }
      }

      return {
        alertId: parseInt(alert.AlertId),
        headline: alert.Headline,
        shortDescription: alert.ShortDescription,
        fullDescription: alert.FullDescription["#cdata-section"],
        severityScore: parseInt(alert.SeverityScore),
        severityColor: alert.SeverityColor,
        severityCSS: alert.SeverityCSS,
        impact: alert.Impact,
        eventStart: new Date(alert.EventStart),
        eventEnd: alert.EventEnd ? new Date(alert.EventEnd) : null,
        TBD: alert.TBD === "1",
        majorAlert: alert.MajorAlert === "1",
        alertURL: alert.AlertURL["#cdata-section"],
        impactedService: (alert.ImpactedService?.Service as RawService[])?.map(
          (service) => {
            return {
              serviceType: service.ServiceType as "T" | "B" | "R",
              serviceTypeDescription: service.ServiceTypeDescription,
              serviceName: service.ServiceName,
              serviceId: service.ServiceId,
              serviceBackColor: service.ServiceBackColor,
              serviceTextColor: service.ServiceTextColor,
              serviceURL: service.ServiceURL?.["#cdata-section"],
            };
          },
        ),
        guid: alert.GUID,
      } as Alert;
    });
  } catch (error) {
    utils.log.error(error);
  }
};

// const all_L_lines = ["red","blue","g","brn","p","y","pink","org"];
// const alerts = await getActiveAlerts({planned: true, accessibility: false, routes: all_L_lines});

// console.log(alerts);
