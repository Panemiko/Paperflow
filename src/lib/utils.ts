import { env } from "@/env";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
}

// try catch abstraction

type Success<T> = [T, null];
type Failure<E> = [null, E];
type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    if (env.NODE_ENV !== "production") {
      console.error(error);
    }

    return [null, error as E];
  }
}
