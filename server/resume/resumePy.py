import json

from fpdf import FPDF

class ResumeGenerator():

    # def generateResume(userInfoFile):
    def generateResume(self):
        #declare file, variable name f
        with open('./resumeContents.json') as f:
            #loads the data in json format
            data = json.load(f)
        pdf = FPDF()
        pdf.add_page()
        
        # Formats personal information
        pdf.set_font('Times', 'BI', 12)
        pdf.cell(0, 5.5, '', 0, 2, 'L', False)
        pdf.cell(0, 5, data['personal']['fullName'], 0, 2, 'C', False)
        pdf.set_font('Times', '', 11)
        pdf.cell(0, 5, data['personal']['email'] + ' | ' + data['personal']['phoneNumber'] + ' | ' + data['personal']['github'], 0, 2, 'C', False)

        # Formats education
        pdf.set_font('Times', 'B', 11)
        pdf.cell(0, 5, 'Education', 0, 2, 'L', False)
        pdf.line(11, pdf.get_y() - 0.6, 200, pdf.get_y() - 0.6)
        pdf.cell(0, 5, data['education']['university'], 0, 0, 'L', False)
        pdf.cell(0, 5, data['education']['graduationDate'], 0, 1, 'R', False)
        pdf.set_font('Times', 'I', 10)
        pdf.cell(0, 5, data['education']['majorAndSchool'], 0, 1, 'L', False)
        pdf.set_font('Times', 'B', 10)
        pdf.cell(0, 5, chr(127) + ' Cumulative GPA: ' + data['education']['cumulativeGPA'], 0, 2, 'L', False)
        pdf.set_font('Times', '', 10)
        pdf.cell(0, 5, chr(127) + ' Relevant Coursework: ' + data['education']['courseWork'], 0, 2, 'L', False)

        # Formats project header
        pdf.set_font('Times', 'B', 11)
        pdf.cell(0, 5, '', 0, 2, 'L', False)
        pdf.cell(52, 5, 'Selected Independent Projects', 0, 0, 'L', False)
        pdf.set_font('Times', '', 11)
        pdf.cell(0, 5, '(More projects available at github.com/volcanoLUL)', 0, 1, 'L', False)
        pdf.line(11, pdf.get_y() - 0.5, 200, pdf.get_y() - 0.5)

        # Formats projects
        for projectNumber in data['projects']:
            pdf.set_font('Times', 'B', 11)
            pdf.cell(0, 5, projectNumber['projectName'], 0, 0, 'L', False)
            pdf.cell(0, 5, projectNumber['projectLocation'], 0, 1, 'R', False)
            pdf.set_font('Times', 'I', 10)
            pdf.cell(0, 5, projectNumber['projectTools'], 0, 0, 'L', False)
            pdf.cell(0, 5, projectNumber['projectDate'], 0, 1, 'R', False)
            pdf.set_font('Times', '', 10)
            pdf.cell(0, 5, chr(127) + ' ' + projectNumber['projectAccomplishmentOne'], 0, 2, 'L', False)
            pdf.cell(0, 5, chr(127) + ' ' + projectNumber['projectAccomplishmentTwo'], 0, 2, 'L', False)
            pdf.cell(0, 5, chr(127) + ' ' + projectNumber['projectAccomplishmentThree'], 0, 2, 'L', False)
            pdf.cell(0, 5, '', 0, 2, 'L', False)

        # Formats experience header
        pdf.set_font('Times', 'B', 11)
        pdf.cell(0, 5, 'Experience', 0, 2, 'L', False)
        pdf.line(11, pdf.get_y() - 0.5, 200, pdf.get_y() - 0.5)

        # Formats experiences
        for experienceNumber in data['experiences']:
            pdf.set_font('Times', 'B', 11)
            pdf.cell(0, 5, experienceNumber['experienceName'], 0, 0, 'L', False)
            pdf.cell(0, 5, experienceNumber['experienceLocation'], 0, 1, 'R', False)
            pdf.set_font('Times', 'I', 10)
            pdf.cell(0, 5, experienceNumber['experiencePosition'], 0, 0, 'L', False)
            pdf.cell(0, 5, experienceNumber['experienceDate'], 0, 1, 'R', False)
            pdf.set_font('Times', '', 10)
            pdf.cell(0, 5, chr(127) + ' ' + experienceNumber['experienceAccomplishmentOne'], 0, 2, 'L', False)
            pdf.cell(0, 5, chr(127) + ' ' + experienceNumber['experienceAccomplishmentTwo'], 0, 2, 'L', False)
            pdf.cell(0, 5, chr(127) + ' ' + experienceNumber['experienceAccomplishmentThree'], 0, 2, 'L', False)
            pdf.cell(0, 5, '', 0, 2, 'L', False)

        # Formats skills & interests header
        pdf.set_font('Times', 'B', 11)
        pdf.cell(0, 5, 'Skills & Interests', 0, 2, 'L', False)
        pdf.line(11, pdf.get_y() - 0.5, 200, pdf.get_y() - 0.5)
        pdf.set_font('Times', '', 10)

        # Formats skills & interests
        pdf.cell(0, 5, chr(127) + ' Proficient: ' + data['skills']['proficient'], 0, 2, 'L', False)
        pdf.cell(0, 5, chr(127) + ' Experienced: ' + data['skills']['experienced'], 0, 2, 'L', False)
        pdf.cell(0, 5, chr(127) + ' Familiar: ' + data['skills']['familiar'], 0, 2, 'L', False)

        pdf.output('Resume.pdf', 'F')

generator = ResumeGenerator()
generator.generateResume()