import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register fonts if needed. Standard fonts come built-in.
// For now we'll use Helvetica as it's safer for PDF stability.

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
        flex: 1,
    },

    // MODERN TEMPLATE STYLES
    modernAside: {
        width: '33%',
        backgroundColor: '#1e293b', // slate-800
        color: '#ffffff',
        padding: 24,
    },
    modernMain: {
        width: '67%',
        padding: 24,
        flexGrow: 1,
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 20,
        alignSelf: 'center',
        objectFit: 'cover',
    },
    photoFallback: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#475569', // slate-600
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    sectionTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#94a3b8', // slate-400
        marginBottom: 8,
        marginTop: 15,
        letterSpacing: 1,
    },
    contactItem: {
        marginBottom: 6,
    },
    contactLabel: {
        fontSize: 7,
        color: '#94a3b8',
        marginBottom: 1,
        textTransform: 'uppercase',
    },
    contactValue: {
        fontSize: 9,
        color: '#ffffff',
    },

    skillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    skillTag: {
        backgroundColor: '#334155', // slate-700
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 4,
        fontSize: 8,
        color: '#ffffff',
        marginRight: 4,
        marginBottom: 4,
    },

    nameHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 2,
    },
    roleHeader: {
        fontSize: 14,
        color: '#2563eb', // blue-600
        marginBottom: 15,
    },

    mainSection: {
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'column',
    },
    mainSectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1e293b',
        borderBottomWidth: 1,
        borderBottomColor: '#2563eb',
        paddingBottom: 2,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    paragraph: {
        fontSize: 10,
        color: '#475569',
        lineHeight: 1.6,
        textAlign: 'justify',
        marginBottom: 4,
    },

    expItem: {
        marginBottom: 12,
        paddingLeft: 8,
        borderLeftWidth: 1,
        borderLeftColor: '#cbd5e1',
    },
    expRole: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    expCompany: {
        fontSize: 10,
        color: '#2563eb',
        marginTop: 1,
    },
    expDate: {
        fontSize: 8,
        color: '#64748b',
        marginTop: 1,
        marginBottom: 3,
    },

    eduItem: {
        marginBottom: 8,
    },
    eduInst: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    eduDegree: {
        fontSize: 10,
        color: '#475569',
    },
    eduDate: {
        fontSize: 8,
        color: '#64748b',
    },

    // MINIMAL TEMPLATE STYLES
    minimalPage: {
        padding: 40,
        fontFamily: 'Helvetica',
    },
    minimalHeader: {
        borderBottomWidth: 2,
        borderBottomColor: '#111827',
        paddingBottom: 15,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    minimalName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        textTransform: 'uppercase',
    },
    minimalContactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        marginTop: 8,
    },
    minimalContactText: {
        fontSize: 9,
        color: '#4b5563',
    },
    minimalSectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#d1d5db',
        paddingBottom: 3,
        marginBottom: 10,
        color: '#111827',
    },
    minimalSkillTag: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        fontSize: 9,
        color: '#374151',
        marginRight: 6,
        marginBottom: 6,
    },
});

const ModernPDF = ({ data }) => (
    <View style={styles.page}>
        <View style={styles.modernAside}>
            {data.personal.photo ? (
                <Image src={data.personal.photo} style={styles.photo} />
            ) : (
                <View style={styles.photoFallback}>
                    <Text style={{ color: '#fff', fontSize: 30 }}>{data.personal.name?.charAt(0) || '?'}</Text>
                </View>
            )}

            <Text style={styles.sectionTitle}>Contact</Text>
            <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{data.personal.email}</Text>
            </View>
            <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{data.personal.phone}</Text>
            </View>
            <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Location</Text>
                <Text style={styles.contactValue}>{data.personal.location}</Text>
            </View>
            {data.personal.linkedin && (
                <View style={styles.contactItem}>
                    <Text style={styles.contactLabel}>LinkedIn</Text>
                    <Text style={styles.contactValue}>{data.personal.linkedin}</Text>
                </View>
            )}
            {data.personal.github && (
                <View style={styles.contactItem}>
                    <Text style={styles.contactLabel}>GitHub</Text>
                    <Text style={styles.contactValue}>{data.personal.github}</Text>
                </View>
            )}

            {data.skills.length > 0 && (
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.skillContainer}>
                        {data.skills.map((s, i) => (
                            <Text key={i} style={styles.skillTag}>{s.name}</Text>
                        ))}
                    </View>
                </View>
            )}
        </View>

        <View style={styles.modernMain}>
            <Text style={styles.nameHeader}>{data.personal.name || 'Your Name'}</Text>
            <Text style={styles.roleHeader}>{data.personal.role || 'Job Title'}</Text>

            {data.summary && (
                <View style={styles.mainSection}>
                    <Text style={styles.mainSectionTitle}>Profile</Text>
                    <Text style={styles.paragraph}>{data.summary}</Text>
                </View>
            )}

            {data.experience.length > 0 && (
                <View style={styles.mainSection}>
                    <Text style={styles.mainSectionTitle}>Experience</Text>
                    {data.experience.map((exp, i) => (
                        <View key={i} style={styles.expItem}>
                            <Text style={styles.expRole}>{exp.role}</Text>
                            <Text style={styles.expCompany}>{exp.company}</Text>
                            <Text style={styles.expDate}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                            <Text style={styles.paragraph}>{exp.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {data.education.length > 0 && (
                <View style={styles.mainSection}>
                    <Text style={styles.mainSectionTitle}>Education</Text>
                    {data.education.map((edu, i) => (
                        <View key={i} style={styles.eduItem}>
                            <Text style={styles.eduInst}>{edu.institution}</Text>
                            <Text style={styles.eduDegree}>{edu.degree} in {edu.field}</Text>
                            <Text style={styles.eduDate}>Graduated: {edu.endDate}</Text>
                            {edu.description && <Text style={[styles.paragraph, { marginTop: 4 }]}>{edu.description}</Text>}
                        </View>
                    ))}
                </View>
            )}

            {data.customSections?.map((section, i) => (
                <View key={i} style={styles.mainSection}>
                    <Text style={styles.mainSectionTitle}>{section.title}</Text>
                    <Text style={styles.paragraph}>{section.content}</Text>
                </View>
            ))}
        </View>
    </View>
);

const MinimalPDF = ({ data }) => (
    <View style={styles.minimalPage}>
        <View style={styles.minimalHeader}>
            {data.personal.photo ? (
                <Image src={data.personal.photo} style={{ width: 60, height: 60, borderRadius: 30, objectFit: 'cover' }} />
            ) : null}
            <View style={{ flex: 1 }}>
                <Text style={styles.minimalName}>{data.personal.name || 'Your Name'}</Text>
                <Text style={{ fontSize: 14, color: '#4b5563', marginTop: 2 }}>{data.personal.role || 'Job Title'}</Text>
                <View style={[styles.minimalContactRow, { marginTop: 5 }]}>
                    <Text style={styles.minimalContactText}>{data.personal.email}</Text>
                    <Text style={styles.minimalContactText}>• {data.personal.phone}</Text>
                    <Text style={styles.minimalContactText}>• {data.personal.location}</Text>
                </View>
            </View>
        </View>

        {data.summary && (
            <View style={{ marginBottom: 15 }}>
                <Text style={styles.minimalSectionTitle}>Summary</Text>
                <Text style={styles.paragraph}>{data.summary}</Text>
            </View>
        )}

        {data.experience.length > 0 && (
            <View style={{ marginBottom: 15 }}>
                <Text style={styles.minimalSectionTitle}>Experience</Text>
                {data.experience.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1f2937' }}>{exp.role}</Text>
                            <Text style={{ fontSize: 8, color: '#6b7280' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                        </View>
                        <Text style={{ fontSize: 9, color: '#4b5563', marginBottom: 2 }}>{exp.company}</Text>
                        <Text style={styles.paragraph}>{exp.description}</Text>
                    </View>
                ))}
            </View>
        )}

        {data.education.length > 0 && (
            <View style={{ marginBottom: 15 }}>
                <Text style={styles.minimalSectionTitle}>Education</Text>
                {data.education.map((edu, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1f2937' }}>{edu.institution}</Text>
                            <Text style={{ fontSize: 8, color: '#6b7280' }}>{edu.endDate}</Text>
                        </View>
                        <Text style={{ fontSize: 9, color: '#4b5563' }}>{edu.degree} in {edu.field}</Text>
                    </View>
                ))}
            </View>
        )}

        {data.skills.length > 0 && (
            <View style={{ marginBottom: 15 }}>
                <Text style={styles.minimalSectionTitle}>Skills</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {data.skills.map((s, i) => (
                        <Text key={i} style={styles.minimalSkillTag}>{s.name}</Text>
                    ))}
                </View>
            </View>
        )}

        {data.customSections?.map((section, i) => (
            <View key={i} style={{ marginBottom: 15 }}>
                <Text style={styles.minimalSectionTitle}>{section.title}</Text>
                <Text style={styles.paragraph}>{section.content}</Text>
            </View>
        ))}
    </View>
);

const CreativePDF = ({ data }) => (
    <View style={styles.page}>
        <View style={[styles.modernAside, { backgroundColor: '#111827', width: '30%' }]}>
            <View style={{ textAlign: 'center', marginBottom: 20 }}>
                {data.personal.photo ? (
                    <Image src={data.personal.photo} style={[styles.photo, { borderColor: '#a855f7', borderWidth: 2 }]} />
                ) : (
                    <View style={[styles.photoFallback, { backgroundColor: '#7c3aed' }]}>
                        <Text style={{ color: '#fff', fontSize: 24 }}>{data.personal.name?.charAt(0) || '?'}</Text>
                    </View>
                )}
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>{data.personal.name}</Text>
                <Text style={{ fontSize: 9, color: '#d8b4fe', textAlign: 'center', marginTop: 4 }}>{data.personal.role}</Text>
            </View>

            <Text style={[styles.sectionTitle, { color: '#9ca3af', marginTop: 10 }]}>Contact</Text>
            <View style={{ gap: 4 }}>
                <Text style={[styles.contactValue, { fontSize: 8 }]}>{data.personal.email}</Text>
                <Text style={[styles.contactValue, { fontSize: 8 }]}>{data.personal.phone}</Text>
                <Text style={[styles.contactValue, { fontSize: 8 }]}>{data.personal.location}</Text>
            </View>
        </View>
        <View style={[styles.modernMain, { backgroundColor: '#ffffff', width: '70%', padding: 25 }]}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 10, borderBottomWidth: 2, borderBottomColor: '#7c3aed', paddingBottom: 2 }}>About Me</Text>
            <Text style={styles.paragraph}>{data.summary}</Text>

            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginTop: 20, marginBottom: 10, borderBottomWidth: 2, borderBottomColor: '#7c3aed', paddingBottom: 2 }}>Experience</Text>
            {data.experience.map((exp, i) => (
                <View key={i} style={{ marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#111827' }}>{exp.role}</Text>
                    <Text style={{ fontSize: 9, color: '#7c3aed', marginBottom: 2 }}>{exp.company}</Text>
                    <Text style={[styles.expDate, { marginBottom: 4 }]}>{exp.startDate} - {exp.endDate}</Text>
                    <Text style={styles.paragraph}>{exp.description}</Text>
                </View>
            ))}
        </View>
    </View>
);

export const CVDocument = ({ data, template }) => {
    let Content = ModernPDF;
    if (template === 'minimal') Content = MinimalPDF;
    if (template === 'creative') Content = CreativePDF;

    return (
        <Document title={`${data.personal.name || 'Resume'}_CV`}>
            <Page size="A4" style={template === 'minimal' ? {} : { flexDirection: 'row' }}>
                <Content data={data} />
            </Page>
        </Document>
    );
};
