import json

from fpdf import FPDF
from decodeFile import decodeFile

class ResumeGenerator():
    decoder = decodeFile()
    def generateResume(self, userInfoFile):
        userInfoFile = self.decoder.decode(userInfoFile)

        #declare file, variable name f
        with open('./decoded.json') as f:
            #loads the data in json format
            data = json.load(f)
        pdf = FPDF()
        pdf.add_page()
        
        # Formats personal information
        pdf.set_font('Times', 'BI', 12)
        pdf.cell(0, 5.5, '', 0, 2, 'L', False)
        pdf.cell(0, 5, data['resumeToAdd']['personal']['fullName'], 0, 2, 'C', False)
        pdf.set_font('Times', '', 11)
        pdf.cell(0, 5, data['resumeToAdd']['personal']['email'] + ' | ' + data['resumeToAdd']['personal']['phoneNumber'] + ' | ' + data['resumeToAdd']['personal']['github'], 0, 2, 'C', False)

        # Formats education
        pdf.set_font('Times', 'B', 11)
        pdf.cell(0, 5, 'Education', 0, 2, 'L', False)
        pdf.line(11, pdf.get_y() - 0.6, 200, pdf.get_y() - 0.6)
        pdf.cell(0, 5, data['resumeToAdd']['education']['university'], 0, 0, 'L', False)
        pdf.cell(0, 5, data['resumeToAdd']['education']['graduationDate'], 0, 1, 'R', False)
        pdf.set_font('Times', 'I', 10)
        pdf.cell(0, 5, data['resumeToAdd']['education']['titleMajor'] + ' | ' + data['resumeToAdd']['education']['college'], 0, 1, 'L', False)
        pdf.set_font('Times', 'B', 10)
        pdf.cell(0, 5, chr(127) + ' Cumulative GPA: ' + data['resumeToAdd']['education']['cumulativeGPA'], 0, 2, 'L', False)
        pdf.set_font('Times', '', 10)
        pdf.cell(0, 5, chr(127) + ' Relevant Coursework: ' + data['resumeToAdd']['education']['courseWork'], 0, 2, 'L', False)

        # Formats project header
        pdf.set_font('Times', 'B', 11)
        pdf.cell(0, 5, '', 0, 2, 'L', False)
        pdf.cell(52, 5, 'Selected Independent Projects', 0, 0, 'L', False)
        pdf.set_font('Times', '', 11)
        pdf.cell(0, 5, '(More projects available at github.com/volcanoLUL)', 0, 1, 'L', False)
        pdf.line(11, pdf.get_y() - 0.5, 200, pdf.get_y() - 0.5)

        # Formats projects
        for projectNumber in data['resumeToAdd']['projectList']:
            pdf.set_font('Times', 'B', 11)
            pdf.cell(0, 5, projectNumber['projectName'], 0, 0, 'L', False)
            pdf.cell(0, 5, projectNumber['projectLocation'], 0, 1, 'R', False)
            pdf.set_font('Times', 'I', 10)
            pdf.cell(0, 5, projectNumber['projectToolsUsed'], 0, 0, 'L', False)
            pdf.cell(0, 5, projectNumber['projectStartDate'] + ' - ' + projectNumber['projectEndDate'], 0, 1, 'R', False)
            pdf.set_font('Times', '', 10)
            pdf.cell(0, 5, chr(127) + ' ' + projectNumber['projectDescription1'], 0, 2, 'L', False)
            pdf.cell(0, 5, chr(127) + ' ' + projectNumber['projectDescription2'], 0, 2, 'L', False)
            pdf.cell(0, 5, chr(127) + ' ' + projectNumber['projectDescription3'], 0, 2, 'L', False)
            pdf.cell(0, 5, '', 0, 2, 'L', False)

        # Formats experience header
        pdf.set_font('Times', 'B', 11)
        pdf.cell(0, 5, 'Experience', 0, 2, 'L', False)
        pdf.line(11, pdf.get_y() - 0.5, 200, pdf.get_y() - 0.5)

        # Formats experiences
        for experienceNumber in data['resumeToAdd']['experienceList']:
            pdf.set_font('Times', 'B', 11)
            pdf.cell(0, 5, experienceNumber['organizationName'], 0, 0, 'L', False)
            pdf.cell(0, 5, experienceNumber['experienceLocation'], 0, 1, 'R', False)
            pdf.set_font('Times', 'I', 10)
            pdf.cell(0, 5, experienceNumber['positionTitle'], 0, 0, 'L', False)
            pdf.cell(0, 5, experienceNumber['experienceStartDate'] + ' - ' + experienceNumber['experienceEndDate'], 0, 1, 'R', False)
            pdf.set_font('Times', '', 10)
            pdf.cell(0, 5, chr(127) + ' ' + experienceNumber['experienceDescription1'], 0, 2, 'L', False)
            pdf.cell(0, 5, chr(127) + ' ' + experienceNumber['experienceDescription2'], 0, 2, 'L', False)
            pdf.cell(0, 5, chr(127) + ' ' + experienceNumber['experienceDescription3'], 0, 2, 'L', False)
            pdf.cell(0, 5, '', 0, 2, 'L', False)

        # Formats skills & interests header
        pdf.set_font('Times', 'B', 11)
        pdf.cell(0, 5, 'Skills & Interests', 0, 2, 'L', False)
        pdf.line(11, pdf.get_y() - 0.5, 200, pdf.get_y() - 0.5)
        pdf.set_font('Times', '', 10)

        # Formats skills & interests
        pdf.cell(0, 5, chr(127) + ' Proficient: ' + data['resumeToAdd']['skills']['proficient'], 0, 2, 'L', False)
        pdf.cell(0, 5, chr(127) + ' Experienced: ' + data['resumeToAdd']['skills']['experienced'], 0, 2, 'L', False)
        pdf.cell(0, 5, chr(127) + ' Familiar: ' + data['resumeToAdd']['skills']['familiar'], 0, 2, 'L', False)

        pdf.output('Resume.pdf', 'F')

        return pdf

generator = ResumeGenerator()
generator.generateResume('./encodedFile.txt')
