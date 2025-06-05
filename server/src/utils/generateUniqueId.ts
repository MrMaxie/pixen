export const generateUniqueId = (usedIds: string[] = []): string => {
    let id: string;
    do {
        id = crypto.randomUUID();
    } while (usedIds.includes(id));
    return id;
};
