import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Get query parameters
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const startDate = url.searchParams.get("startDate") || "";
  const endDate = url.searchParams.get("endDate") || "";
  const status = url.searchParams.get("status") || "";

  // Calculate offset
  const offset = (page - 1) * limit;

  // Build query
  let query = supabase.from("journal_entries").select("*", { count: "exact" });

  // Add filters if provided
  if (startDate && endDate) {
    query = query
      .gte("transaction_date", startDate)
      .lte("transaction_date", endDate);
  }

  if (status) {
    query = query.eq("status", status);
  }

  // Add pagination
  const { data, error, count } = await query
    .order("transaction_date", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    meta: {
      total: count || 0,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 0,
    },
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { journalEntry, items } = await request.json();

  // Start a transaction
  const { data: entryData, error: entryError } = await supabase
    .from("journal_entries")
    .insert(journalEntry)
    .select();

  if (entryError) {
    return NextResponse.json({ error: entryError.message }, { status: 500 });
  }

  // Add journal entry ID to each item
  const journalEntryId = entryData[0].id;
  const itemsWithEntryId = items.map((item: any) => ({
    ...item,
    journal_entry_id: journalEntryId,
  }));

  // Insert items
  const { error: itemsError } = await supabase
    .from("journal_entry_items")
    .insert(itemsWithEntryId);

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({ data: entryData[0] });
}
