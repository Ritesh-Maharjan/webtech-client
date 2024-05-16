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
        const response = await fetch(`${restBase}webtech-staff?_embed`);
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

  useEffect(() => {
    const fetchFeaturedImages = async () => {
      const updatedStaffMembers = await Promise.all(
        staffMembers.map(async (staff) => {
          try {
            const response = await fetch(`${restBase}media/${staff.featured_media}`);
            if (!response.ok) {
              throw new Error("Failed to fetch featured image");
            }
            const data: MediaData = await response.json();
            return { ...staff, source_url: data.source_url };
          } catch (error) {
            console.error("Error fetching featured image:", error);
            return staff; // Keep the staff member if fetching the image fails
          }
        })
      );
      setStaffMembers(updatedStaffMembers);
    };

    fetchFeaturedImages();
  }, [restBase, staffMembers]);

  return (
    <div>
      <h2>Staff Members</h2>
			<section className="flex">
      {staffMembers.map((staff) => (
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
