// Staff.tsx
import React from "react";

interface updatedStaffMember {
  name: string;
  source_url: string;
}

interface StaffProps {
  firstStaff: updatedStaffMember;
  secondStaff: updatedStaffMember;
}

const Staff: React.FC<StaffProps> = ({ firstStaff, secondStaff }) => {
  if (!firstStaff && !secondStaff) return;

  return (
    <div className={`flex w-fit h-fit gap-4 `}>
      <div
        className="flex flex-col items-center justify-center gap-2"
      >
        <h3 className="lg:text-2xl">{firstStaff.name}</h3>
        {firstStaff.source_url && (
          <img
            className="h-32 w-32 object-cover object-top rounded-full"
            src={firstStaff.source_url}
            alt={firstStaff.name}
          />
        )}
      </div>
      <div
        className="flex flex-col items-center justify-center gap-2"
      >
        <h3 className="lg:text-2xl">{secondStaff.name}</h3>
        {secondStaff.source_url && (
          <img
            className="h-32 w-32 object-cover object-top rounded-full"
            src={secondStaff.source_url}
            alt={secondStaff.name}
          />
        )}
      </div>
    </div>
  );
};

export default Staff;
