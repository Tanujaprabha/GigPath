export function safeDate(value) {
    try {
        if (!value)
            return null;

        // Firestore Timestamp object
        if (typeof value?.toDate === "function") {
            const d = value.toDate();
            return isNaN(d.getTime()) ? null : d;
        }

        // seconds/nanoseconds format
        if (
            value &&
            typeof value === "object" &&
            value.seconds !== undefined
        ) {
            const d = new Date(value.seconds * 1000);
            return isNaN(d.getTime()) ? null : d;
        }

        const d = new Date(value);
        return isNaN(d.getTime())
            ? null
            : d;
    }
    catch (error) {
        console.error(
            "safeDate failed",
            value,
            error
        );
        return null;
    }
}
