export const cidrToRange = (cidrNotation: string, mechanism?: string) => {
  const [ipAddress, cidrRangeStr] = cidrNotation.split('/');
  const isIPv6 = ipAddress.includes(':');
  if (!isIPv6) {
    const cidrRange = parseInt(cidrRangeStr, 10);
    const ipParts = ipAddress?.split('.').map(Number);
    const mask = (0xFFFFFFFF << (32 - cidrRange)) >>> 0;

    const start = ipParts.map((part, index) => ((part & (mask >>>(24 - index * 8))) >>> 0)).join('.');

    const startRange = start + ' - ';

    const hostCount = Math.pow(2, 32 - cidrRange);
    const endInt = ipParts.reduce((acc, part, index) => {
      return acc | ((part & 255) << (24 - index * 8));
    }, 0) + hostCount - 1;

    const end = [
      (endInt >>> 24) & 255,
      (endInt >>> 16) & 255,
      (endInt >>> 8) & 255,
      endInt & 255
    ].join('.');

    return `(${startRange}${end})`;
  } else {
    return `(${cidrNotation} - ${cidrNotation})`;
  }
}
