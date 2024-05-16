import React, { useEffect, useState } from "react";

interface StaffMember {
  id: number;
  title: { rendered: string };
  featured_media: number;
  source_url?: string; // Added source_url as an optional property
}

const Staff: React.FC<{ restBase: string }> = ({ restBase }) => {
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

  // Splitting staff members into two arrays, each containing two staff members
  const firstSectionStaff = staffMembers.slice(0, 2);
  const secondSectionStaff = staffMembers.slice(2, 4);

  return (
    <div>
      <h2>Staff Members</h2>
      
      {/* First Section */}
      <section className="flex">
        {firstSectionStaff.map((staff) => (
          <div key={staff.id}>
            <h3>{staff.title.rendered}</h3>
            {staff.source_url && (
              <img className="w-[250px]" src={staff.source_url} alt={staff.title.rendered} />
            )}
          </div>
        ))}
      </section>

      {/* Second Section */}
      <section className="flex">
        {secondSectionStaff.map((staff) => (
          <div key={staff.id}>
            <h3>{staff.title.rendered}</h3>
            {staff.source_url && (
              <img className="w-[250px]" src={staff.source_url} alt={staff.title.rendered} />
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Staff;
