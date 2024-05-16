// Staff.tsx
import React, { useEffect, useState } from "react";

interface StaffMember {
  id: number;
  title: { rendered: string };
  featured_media: number;
  source_url?: string; // Added source_url as an optional property
}

interface StaffProps {
  restBase: string;
  section: "first" | "second";
}

const Staff: React.FC<StaffProps> = ({ restBase, section }) => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const response = await fetch(`${restBase}webtech-staff?_embed`);
        if (!response.ok) {
          throw new Error("Failed to fetch staff members");
        }
        const data: StaffMember[] = await response.json();
        
        // Map through the data and add the source_url directly to each staff member
        const updatedStaffMembers = data.map(staff => ({
          ...staff,
          source_url: staff._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null
        }));
        
        setStaffMembers(updatedStaffMembers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStaffMembers();
  }, [restBase]);

  // Determine the number of staff members to display based on the section
  const startIdx = section === "first" ? 0 : 2;
  const endIdx = section === "first" ? 2 : 4;
  const sectionStaff = staffMembers.slice(startIdx, endIdx);

  return (
    <div className="flex">
      {sectionStaff.map((staff) => (
        <div key={staff.id}>
          <h3>{staff.title.rendered}</h3>
          {staff.source_url && (
            <img className="w-[150px] h-[150px] object-cover rounded-full" src={staff.source_url} alt={staff.title.rendered} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Staff;
