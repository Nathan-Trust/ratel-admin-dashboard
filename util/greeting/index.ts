import { getHours } from 'date-fns';

/**
 * Time-based greeting configuration.
 */
interface GreetingMessages {
  morning: string;
  afternoon: string;
  evening: string;
  late: string;
}

/**
 * Default greeting messages.
 */
const DEFAULT_MESSAGES: GreetingMessages = {
  morning: "Good Morning, {name}!",
  afternoon: "Good Afternoon, {name}!",
  evening: "Good Evening, {name}!",
  late: "Good Night, {name}!"
};

/**
 * Generates a time-based greeting with custom messages.
 * @param {Date} [date=new Date()] - Date to evaluate (defaults to current time)
 * @param {Partial<GreetingMessages>} [messages={}] - Custom greeting messages
 * @param {string} [name=""] - Name to personalize the greeting
 * @returns {string} Personalized greeting based on the time of day
 *
 * @example
 * // Parameter style without name
 * getTimeGreeting(new Date(), customMessages);
 * // Returns: "Rise and shine!"
 *
 * @example
 * // Parameter style with name
 * getTimeGreeting(new Date(), customMessages, 'Alex');
 * // Returns: "Rise and shine, Alex!"
 *
 * @example
 * // Options object style
 * getTimeGreeting({ date: new Date(), messages: customMessages, name: 'Alex' });
 */
export function getTimeGreeting(
  dateOrOptions: Date | { date?: Date; messages?: Partial<GreetingMessages>; name?: string } = new Date(),
  messages?: Partial<GreetingMessages>,
  name?: string
): string {
  // Handle parameter overloading
  let date: Date;
  let finalMessages: Partial<GreetingMessages>;
  let finalName: string;

  if (dateOrOptions instanceof Date) {
    // Parameter style
    date = dateOrOptions;
    finalMessages = messages || {};
    finalName = name || "";
  } else {
    // Options object style
    date = dateOrOptions.date || new Date();
    finalMessages = dateOrOptions.messages || {};
    finalName = dateOrOptions.name || "";
  }

  const hour = getHours(date);
  const mergedMessages = { ...DEFAULT_MESSAGES, ...finalMessages };

  let timeKey: keyof GreetingMessages;
  if (hour < 12) timeKey = "morning";
  else if (hour < 17) timeKey = "afternoon";
  else if (hour < 22) timeKey = "evening";
  else timeKey = "late";

  let message = mergedMessages[timeKey];
  
  // Handle name presence/absence
  if (finalName) {
    message = message.replace(/{name}/g, finalName);
  } else {
    // Remove comma and name placeholder if no name is provided
    message = message.replace(/,?\s?{name}/g, '');
  }

  return message;
}
