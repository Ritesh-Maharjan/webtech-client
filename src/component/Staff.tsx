import React, { useEffect, useState } from "react";

interface StaffMember {
  id: number;
  title: { rendered: string };
  featured_media: number;
}

interface MediaData {
  id: number;
  source_url: string;
}

const Staff: React.FC<{ restBase: string }> = ({ restBase }) => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const response = await fetch(`${restBase}webtech-staff`);
        if (!response.ok) {
          throw new Error("Failed to fetch staff members");
        }
        const data: StaffMember[] = await response.json();
        setStaffMembers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStaffMembers();
  }, [restBase]);

  const fetchFeaturedImage = async (id: number) => {
    try {
      const response = await fetch(`${restBase}media/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch featured image");
      }
      const data: MediaData = await response.json();
      return data.source_url;
    } catch (error) {
      console.error("Error fetching featured image:", error);
      return null;
    }
  };

  return (
    <div className="max-width">
      <h2>Staff Members</h2>
      {staffMembers.map((staff) => (
        <div key={staff.id}>
          <h3>{staff.title.rendered}</h3>
          <img
            src={fetchFeaturedImage(staff.featured_media)}
            alt={staff.title.rendered}
          />
        </div>
      ))}
    </div>
  );
};

export default Staff;
